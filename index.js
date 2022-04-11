const express = require('express');
const app = express();
const path = require('path')
const PORT = process.env.PORT || 3000;


app.use(express.static('public'))
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'))

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

app.listen(PORT, () => console.log('Server Started'));