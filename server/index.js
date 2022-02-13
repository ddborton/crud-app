const express = require("express")
const app = express();
const mysql = require("mysql");
const cors = require('cors');

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "emp1",
    password: "MyNewPass"
});

app.post("/create", (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    connection.query("INSERT INTO table1 (name, age, country, position, wage) VALUES (?,?,?,?,?)"
        ,[name, age, country, position, wage],(err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send("Values inserted");
        }
        });
});

app.get( "/employees", (req, res) => {
    connection.query("SELECT * FROM table1;", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
        }
    });
});
app.listen( 3001, () => {
    console.log("Server is running on port 3001");
});

connection.connect(function(err){
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else{
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});
