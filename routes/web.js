const authcontroller = require("../app/http/controllers/authController");
const homeController = require("../app/http/controllers/homeController");
const cartController = require("../app/http/controllers/user/cartController");
const guest = require("../app/http/middleware/guest");

function initRoutes(app) {
    
    app.get('/', homeController().index)

    app.get('/login',guest, authcontroller().login)
    app.post('/login',authcontroller().postLogin)

    app.get('/logout',authcontroller().logout)


    app.get('/register',guest,authcontroller().register)
    app.post('/register',authcontroller().postRegister)

    app.get('/cart', cartController().index)
    app.post('/update-cart',cartController().update)
    
}

module.exports = initRoutes;