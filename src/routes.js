module.exports = function (app) {
    /***********Admin***********/
    app.use('/api/admin/*',[require('./Middlewares/IsAuth'),require('./Middlewares/IsAdmin')]);
    app.use('/api/admin/sections', require('./Routes/Admin/SectionsRoutes'));
    app.use('/api/admin/posts', require('./Routes/Admin/PostsRoutes'));
    /*****************************/

    /***********Front***********/
    app.use('/auth', require('./Routes/ConfirmRoutes'));
    app.use('/api/auth', require('./Routes/AuthRoutes'));
    app.use('/api/sections', require('./Routes/SectionsRoutes'));
    app.use('/api/posts', require('./Routes/PostsRoutes'));
    /*****************************/

    /***********Logged***********/
    app.use('/api/profile',[require('./Middlewares/IsAuth')],require('./Routes/Logged/ProfileRoutes'));
    /*****************************/

}

