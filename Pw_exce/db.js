const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "nodemsq",
})

db.connect(function (err) {
    if (err) {throw err}
    console.log('Connected!');
})

module.exports = db;