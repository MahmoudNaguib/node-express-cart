require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const multer = require('multer');
const upload = multer();
/************Attach fields must be added below**************/
app.use(upload.fields([{name:'image',maxCount: 1}]));
app.use('/uploads',express.static(__dirname+'/public/uploads'));
app.use('/assets/imgs',express.static(__dirname+'/public/assets/imgs'));

/**********************/
const hbs = require('express-handlebars');
app.engine('hbs', hbs.engine({
    layoutsDir:'src/views/layouts/',
    defaultLayout: 'main',
    extname: '.hbs',
    helpers:{
        appName:process.env.APP_NAME,
        baseUrl:process.env.APP_URL,
        year:new Date().getFullYear()
    }
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');
/*****************************/



app.get('/',(req,res,next)=>{
    res.render('home/index');
});
require('./src/routes')(app);



app.listen(port, () => console.log('Listening to port '+ port + ' ....'));


