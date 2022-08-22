module.exports = function (app) {
    /***********Admin***********/
    app.use('/api/admin/*',[require('./Middlewares/IsAuth'),require('./Middlewares/IsAdmin')]);
    app.use('/api/admin/sections', require('./Routes/Admin/AdminSectionsRoutes'));
    app.use('/api/admin/posts', require('./Routes/Admin/AdminPostsRoutes'));
    app.use('/api/admin/categories', require('./Routes/Admin/AdminCategoriesRoutes'));
    app.use('/api/admin/products', require('./Routes/Admin/AdminProductsRoutes'));
    /*****************************/

    /***********Front***********/
    app.use('/auth', require('./Routes/ConfirmRoutes'));
    app.use('/api/countries', require('./Routes/CountriesRoutes'));
    app.use('/api/auth', require('./Routes/AuthRoutes'));
    app.use('/api/sections', require('./Routes/SectionsRoutes'));
    app.use('/api/posts', require('./Routes/PostsRoutes'));
    app.use('/api/categories', require('./Routes/CategoriesRoutes'));
    app.use('/api/products', require('./Routes/ProductsRoutes'));
    /*****************************/

    /***********Logged***********/
    app.use('/api/profile',[require('./Middlewares/IsAuth')],require('./Routes/Logged/ProfileRoutes'));
    app.use('/api/cart',[require('./Middlewares/IsAuth')],require('./Routes/Logged/CartRoutes'));
    app.use('/api/favorites',[require('./Middlewares/IsAuth')],require('./Routes/Logged/FavoritesRoutes'));
    app.use('/api/addresses',[require('./Middlewares/IsAuth')],require('./Routes/Logged/AddressesRoutes'));
    app.use('/api/orders',[require('./Middlewares/IsAuth')],require('./Routes/Logged/OrdersRoutes'));
    /*****************************/

}

