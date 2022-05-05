const authcontroller = require("../app/http/controllers/authController");
const homeController = require("../app/http/controllers/homeController");
const cartController = require("../app/http/controllers/user/cartController");
const orderController = require('../app/http/controllers/user/orderController');
const guest = require("../app/http/middleware/guest");
const auth = require("../app/http/middleware/auth");


function initRoutes(app) {
    
    app.get('/', homeController().index)

    app.get('/login',guest, authcontroller().login)
    app.post('/login',authcontroller().postLogin)

    app.get('/logout',authcontroller().logout)


    app.get('/register',guest,authcontroller().register)
    app.post('/register',authcontroller().postRegister)

    app.get('/cart', cartController().index)
    app.post('/update-cart',cartController().update)

    app.get('/customer/orders',auth,orderController().index);
    app.post('/orders',auth,orderController().store);
    
}

module.exports = initRoutes;