require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Node express knex cart');
});

require('./src/routes')(app);
app.listen(port, () => console.log('Listening to port ' + port + ' ....'));


