const User = require('../../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport')

function authcontroller() {
    const _getRedirectUrl = (req) => {
        return req.user.role === 'admin' ? '/admin/orders' : '/customer/orders'
    }

    return {
        login(req, res) {
            let user = req.user;
            res.render('login',{user:user})
        },
        postLogin(req, res, next) {
            const {
                email,
                password
            } = req.body;

            // validation
            if (!email || !password) {
                req.flash('error', 'All fields are required')
                return res.redirect('/login')
            }
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    req.flash('error', info.message)
                    return next(err)
                }
                if(!user){
                    req.flash('error',info.message)
                    return res.redirect('login')
                }
                req.logIn(user,(err) => {
                    if(err){
                        req.flash('error',info.message)
                        return next(err)
                    }
                    return res.redirect(_getRedirectUrl(req))
                })
            })(req,res,next)
        },
        register(req, res) {
            res.render('register')
        },
        async postRegister(req, res) {
            const {
                name,
                email,
                password
            } = req.body;

            // validation
            if (!name || !email || !password) {
                req.flash('error', 'All fields are required')
                req.flash('name', name)
                req.flash('email', email)
                return res.redirect('/register')
            }

            // Checking email
            User.exists({
                email: email
            }, (err, result) => {
                if (result) {
                    req.flash('error', 'Email already taken')
                    req.flash('name', name)
                    req.flash('email', email)
                    return res.redirect('/register')
                }
            })

            // Hash password 
            const hashedPassword = await bcrypt.hash(password, 10)
            // Create a user 
            const user = new User({
                name,
                email,
                password: hashedPassword
            })
            user.save().then((user) => {
                // Login
                return res.redirect('/')
            }).catch(err => {
                req.flash('error', 'Something went wrong')
                return res.redirect('/register')
            })

        },
        logout(req,res){
            req.logout()
            return res.redirect('/login');
        }
    }
}

module.exports = authcontroller;