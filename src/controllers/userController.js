const connection = require('../database/connection')
const userService = require('../services/userService')
const getAllUsers = async (req, res) => {
    const users = await userService.getAllUsers();
    console.log(users)
    return res.status(200).json(users);


}
const getUserById = async (req, res) => {
    const id = req.params.id
    let user = await userService.getUserById(id);
    console.log(user);
    if (user) {
        return res.status(200).json(user);
    }
    else res.status(404).json({ message: "Not found" })
}
const createUser = (req, res) => {
    const name = req.body.name
    const age = req.body.age
    const gender = req.body.gender;
    console.log(name)
    let query = "INSERT INTO Users(name,gender,age) VALUES (?,?,?)";
    connection.query(query, [name, gender, age], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(401).json({
                message: "Cannot create user"
            });
        }

        return res.status(201).json({
            message: "Created a user"
        });
    })
}
const updateUser = (req, res) => {
    const user = req.body;
    const name = user.name;
    const age = user.age;
    const gender = user.gender;
    const id = req.params.id;
    let query = `UPDATE Users
        SET name = ?, 
        gender=?,
        age =?
        WHERE id =?;`
    connection.query(query, [name, gender, age, id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(401).json({
                message: "Cannot update user"
            });
        }

        return res.status(204).json({
            message: "Updated a user"
        });
    })
}
const deleteUser = (req, res) => {
    let query = `DELETE FROM Users WHERE id =?;`;
    let id = req.params.id;
    connection.query(query, id, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(401).json({
                message: "Cannot delete user"
            });
        }

        return res.status(204).json({
            message: "Deleted a user"
        });
    })
}

module.exports = {
    getAllUsers,
    createUser,
    deleteUser,
    getUserById,
    updateUser,
}

