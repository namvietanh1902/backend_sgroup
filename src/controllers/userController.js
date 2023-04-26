const connection = require('../database/connection')
const getAllUsers = async (req, res) => {
    let query = "SELECT * FROM Users";
    let user = await connection.query(query);
    return res.status(200).json(user[0]);

    
}
const getUserById = (req, res) => {
    const id = req.params.id
    let query = "SELECT * FROM User WHERE id =?";
    connection.query(query, [id], (err, result) => {
        if (err) {
            return res.status(404).json({
                message: "Error getting data"
            });
        }
        return res.status(200).json(result[0]);
    })
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

