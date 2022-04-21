const authcontroller = require("../app/http/controllers/authController");
const homeController = require("../app/http/controllers/homeController");
const cartController = require("../app/http/controllers/user/cartController");

function initRoutes(app) {
    
    app.get('/', homeController().index)
    app.get('/login', authcontroller().login)
    app.get('/register', authcontroller().register)
    app.get('/cart', cartController().index)
    app.post('/update-cart',cartController().update)
    
}

module.exports = initRoutes;