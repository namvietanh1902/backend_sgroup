const connection = require('./connection');
const users = [
  {
    username: "tannang",
    password: "123456",
    salt: "",
    name: "Huynh Tan Nang",
    age: 21,
    gender: true,
    email: "tannang09032002@gmail.com",
  },
  {
    username: "quocron",
    password: "123456",
    salt: "",
    name: "Le Quoc Ron",
    age: 20,
    gender: true,
    email: "ronle75@gmail.com",
  },
  {
    username: "ductai",
    password: "123456",
    salt: "",
    name: "Le Duc Tai",
    age: 20,
    gender: true,
    email: "taile@gmail.com",
  },
  {
    username: "namanh",
    password: "123456",
    satl: "",
    name: "Nguyen Pham Nam Em",
    age: 20,
    gender: true,
    email: "namem@gmail.com",
  },
  {
    username: "hungngoc",
    password: "123456",
    salt: "",
    name: "Nguyen Hung Ngoc",
    age: 20,
    gender: false,
    email: "hungngoc@gmail.com",
  },
]
const data = users.map((user) => Object.values(user))
// let createTable = `
//     CREATE TABLE IF NOT EXISTS User (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(255) NOT NULL,
//     age INT NOT NULL,
//     gender BOOLEAN
//   );
 

//   `;
let query = "INSERT INTO User(name,gender,age) VALUES ?";
// connection.query(createTable).then(

//     connection.query(query, [data])
// )
connection.query(query, [data])
    .then(()=>{
        console.log("Added seed data");
    })