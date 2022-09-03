module.exports = function (app) {
    /***********Admin***********/
    app.use('/api/admin/*',[require('./Middlewares/IsAuth'),require('./Middlewares/IsAdmin')]);
    app.use('/api/admin/sections', require('./Routes/Api/Admin/AdminSectionsRoutes'));
    app.use('/api/admin/posts', require('./Routes/Api/Admin/AdminPostsRoutes'));
    app.use('/api/admin/categories', require('./Routes/Api/Admin/AdminCategoriesRoutes'));
    app.use('/api/admin/products', require('./Routes/Api/Admin/AdminProductsRoutes'));
    app.use('/api/admin/orders', require('./Routes/Api/Admin/AdminOrdersRoutes'));
    /*****************************/

    /***********Front***********/
    app.use('/auth', require('./Routes/Api/ConfirmRoutes'));
    app.use('/api/countries', require('./Routes/Api/CountriesRoutes'));
    app.use('/api/auth', require('./Routes/Api/AuthRoutes'));
    app.use('/api/sections', require('./Routes/Api/SectionsRoutes'));
    app.use('/api/posts', require('./Routes/Api/PostsRoutes'));
    app.use('/api/categories', require('./Routes/Api/CategoriesRoutes'));
    app.use('/api/products', require('./Routes/Api/ProductsRoutes'));
    /*****************************/

    /***********Logged***********/
    app.use('/api/profile',[require('./Middlewares/IsAuth')],require('./Routes/Api/Logged/ProfileRoutes'));
    app.use('/api/cart',[require('./Middlewares/IsAuth')],require('./Routes/Api/Logged/CartRoutes'));
    app.use('/api/favorites',[require('./Middlewares/IsAuth')],require('./Routes/Api/Logged/FavoritesRoutes'));
    app.use('/api/addresses',[require('./Middlewares/IsAuth')],require('./Routes/Api/Logged/AddressesRoutes'));
    app.use('/api/orders',[require('./Middlewares/IsAuth')],require('./Routes/Api/Logged/OrdersRoutes'));
    /*****************************/
    app.use('/', require('./Routes/HomeRoutes'));

}

