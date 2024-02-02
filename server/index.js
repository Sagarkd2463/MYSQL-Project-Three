const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'r$$100200',
    database: 'employeeSystem',
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Database Connected Successfully...');
    }
});

app.post('/create', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    db.query(
        "INSERT INTO employees (name, age, country, position, wage) VALUES (?, ?, ?, ?, ?)",
        [name, age, country, position, wage],
        (err) => {
            if (err) {
                res.send({ status: false, message: err.stack });
            } else {
                res.send({ status: true, message: "Employee Created..." });
            }
        }
    );
});

app.get('/employees', (req, res) => {

    db.query(
        "SELECT * FROM employees",
        (err, data) => {
            if (err) {
                res.send({ status: false, message: err.stack });
            } else {
                res.send({ status: true, message: data });
            }
        }
    );
});

app.put("/update", (req, res) => {
    const id = req.body.id;
    const wage = req.body.wage;
    db.query(
        "UPDATE employees SET wage = ? WHERE id = ?",
        [wage, id],
        (err, data) => {
            if (err) {
                res.send({status: false, message: err.stack});
            } else {
                res.send({status: true, message: data});
            }
        }
    );
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    db.query(
        "DELETE FROM employees WHERE id = ?",
        id,
        (err) => {
            if (err) {
                res.send({ status: false, message: err.stack });
            } else {
                res.send({ status: true, message: "Employee Deleted..." });
            }
        }
    );
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Listening on port: http://localhost:${PORT}`);
});