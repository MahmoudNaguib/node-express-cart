require('dotenv').config();
const express = require('express');
const multer = require('multer');
const upload = multer();
const cors = require('cors');

const app = express();
const port = process.env.PORT;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(upload.fields([{name:'image',maxCount: 1},{name:'avatar'}]));

app.get('/', (req, res) => {
    res.send('Node express cart');
});

require('./src/routes')(app);
app.listen(port, () => console.log('Listening to port ' + port + ' ....'));


