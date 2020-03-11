const mysql = require('mysql');
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');
const moment = require('moment');

app.use(cors());

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(
    function (req, res, next) {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'origin,Content-Type,accept');
        next();
    }
);

const DBConfig = {
    host: 'localhost',
    user: 'root',
    password: 'dkflbckfd99V',
    database: 'aTracker'
}

const DBConnection = mysql.createConnection(DBConfig);

DBConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});

const port = 4000;

app.listen(port, () => console.log('Server start at port', port));

//get all activity
app.get('/activity', (req, res) => {
    const sqlQuery = 'SELECT * FROM activity'
    DBConnection.query(sqlQuery, (err, rows, fields) => {
        if (err)
            console.log(err);
        else res.send(rows);
    })
})

//insert new activity
app.post('/activity', (req, res) => {
    const { start, finish, distance, type } = req.body;
    const sql = 'INSERT INTO activity (start,finish,distance,type,date) VALUES (?,?,?,?,?)';
    DBConnection.query(sql, [start, finish, distance, type, moment().format("MMMM Do")], (err, results) => {
        if (err) {
            console.log(err)
            return;
        }
        else {
            res.send();
        }
    })
})
