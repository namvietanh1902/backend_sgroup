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
let createTable = `
    CREATE TABLE IF NOT EXISTS User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    gender BOOLEAN
  );
  CREATE TABLE IF NOT EXISTS Student(
    id_student INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  );
  CREATE TABLE IF NOT EXISTS Course(
    id_course INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  );
  CREATE TABLE IF NOT EXISTS Register(
    student INT FOREIGN KEY REFERENCES Student(id_student)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    course INT FOREIGN KEY REFERENCES Course(id_course)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    register_date DATETIME,
    ADD CONSTRAINT Pk_Register PRIMARY KEY(student,course)
    
  );

  `;
let query = "INSERT INTO User(name,gender,age) VALUES ?";
connection.query(createTable, (err, res) => {
    if (!err) {
        console.log("Create table successfully");
    }
    else {
        console.log(err);
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