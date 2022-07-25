module.exports = function (app) {
    /***********Admin***********/
    app.use('/api/admin/sections', require('./Routes/Admin/SectionsRoutes'));
    app.use('/api/admin/posts', require('./Routes/Admin/PostsRoutes'));
    /***********Admin***********/
    app.use('/api/auth', require('./Routes/AuthRoutes'));
}

