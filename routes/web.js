function initRoutes(app){
    app.get('/',(req,res) => {
        res.render('home')
    })
    app.get('/cart',(req,res) => {
        res.render('cart')
    })
    app.get('/login',(req,res) => {
        res.render('login')
    })
    app.get('/register',(req,res) => {
        res.render('register')
    })
}

module.exports = initRoutes;