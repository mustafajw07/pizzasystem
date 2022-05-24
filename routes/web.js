const authcontroller = require("../app/http/controllers/authController");
const homeController = require("../app/http/controllers/homeController");
const cartController = require("../app/http/controllers/user/cartController");
const orderController = require('../app/http/controllers/user/orderController');
const adminController = require('../app/http/controllers/admin/adminController');
const statusController = require('../app/http/controllers/admin/statusController');
const guest = require("../app/http/middleware/guest");
const auth = require("../app/http/middleware/auth");
const admin = require("../app/http/middleware/admin");


function initRoutes(app) {
    // Home
    app.get('/', homeController().index)

    // Login
    app.get('/login',guest, authcontroller().login)
    app.post('/login',authcontroller().postLogin)

    // Register
    app.get('/register',guest,authcontroller().register)
    app.post('/register',authcontroller().postRegister)

    // Logout
    app.get('/logout',authcontroller().logout)

    // Cart
    app.get('/cart', cartController().index)
    app.post('/update-cart',cartController().update)

    // Order
    app.post('/orders',auth,orderController().store);
    app.get('/customer/orders',auth,orderController().index);
    app.get('/customer/orders/:id',auth,orderController().show);

    // Admin
    app.get('/admin/orders',admin,adminController().index);
    app.post('/admin/order/status',admin,statusController().update);
    
}

module.exports = initRoutes;