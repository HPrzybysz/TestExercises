const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const mysql = require('mysql');
const userRoutes = require('./userRoutes');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'nodemsq',
})

connection.connect(function (err) {
    if (err) {throw err}

    console.log('Connected!');
})



const pageRouter  = express.Router();

app.use(express.static('public'));
app.use(bodyParser.json());

app.use("/users", userRoutes);

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/users2/:name', (req, res) => {
    const name = req.params.name;
    const sql5 = 'SELECT * FROM users WHERE name = ?';
    connection.query(sql5,[name], function (err, result) {
        if (err) {throw err}

        res.json(result);
    })
})

pageRouter.get('/about', (req, res) => {
    res.send('About page');
})

app.listen(port, () => {
    console.log('Listening on port ' + port);
})
