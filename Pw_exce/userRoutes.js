const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/', function (req, res) {
    const query = 'SELECT * FROM users';

    db.query(query, function (err, result) {
        if (err) {
            throw err;
        }else{
            res.status(200).json(result);
        }
    })
})

router.get('/:id', function (req, res) {
    const query = 'SELECT * FROM users WHERE id = ?';
    const id = req.params.id;

    db.query(query, [id], function (err, result) {
        if (err) {
            console.log("error", err);
            res.status(500).send("error");
        }else if(result.length === 0){
            res.status(404).send("Not Found");
        }else {
            res.status(200).json(result);
        }
    })
})

router.post('/', (req, res) => {
    const { name, surname } = req.body;
    const query = "INSERT INTO users (name, surname) VALUES (?,?)";
    db.query(query,[name, surname], function (err, result) {
        if (err) {
            console.log("Error at creating", err);
            res.status(500).send(Error);
        }else {
            res.status(200).send("user added successfully.");
        }
    })
})

router.put('/:id', function (req, res) {
    const id = req.params.id;
    const {name, surname } = req.body;

    const query = "UPDATE users SET name = ?, surname = ? WHERE id = ?";
    db.query(query,[name, surname, id], function (err, result) {
        if (err) {
            console.log("error", err);
            res.status(500).send("error");
        }else if(result.affectedRows === 0){
            res.status(404).send("Not Found");
        }else{
            res.status(200).send({id, name, surname});
        }
    })

})

router.delete('/:id', function (req, res) {
    const id = req.params.id;
    const query = "DELETE FROM users WHERE id = ?";
    db.query(query, [id], function (err, result) {
        if (err) {
            console.log("error", err);
            res.status(500).send("error");
        }else if(result.affectedRows === 0){
            res.status(404).send("Not Found");
        }else{
            res.status(200).send("User removed successfully.");
        }
    })
})

module.exports = router;