const connection = require('./connection')
const users = [
    {

        "fullname": "Nguyen Huy Tuong",
        "gender": true,
        "age": 18
    },
    {
        "fullname": "Nguyen Thi Tuong",
        "gender": false,
        "age": 15
    }

];
const data = users.map((user) => Object.values(user))
let createTable = `CREATE TABLE IF NOT EXISTS User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    gender BOOLEAN
  )`;
let query = "INSERT INTO User(name,gender,age) VALUES ?";
connection.query(createTable, (err, res) => {
    if (!err) {
        console.log("Create table successfully");
    }
    else {
        console.log("There is an error");
    }
})
connection.query(query, [data], (err, res) => {
    if (!err) {
        console.log("Insert people successfully");
    }
    else {
        console.log(err);
    }
})