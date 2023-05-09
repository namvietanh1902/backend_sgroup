const { getOne, create, getMany } = require('../database/query')
const db = require('../database/connection')
const connection = require('../database/connection')
const getAllUsers = async () => {
    let query = "SELECT * FROM User";
    let user = await getMany({
        db: db,
        query
    });
    return user;


}
const getUserById = async (id) => {
    let query = "SELECT * FROM User WHERE id =?";
    let user = await getOne({
        db: db,
        query,
        params: [id]
    });
    return user;

}
const getUserByToken = async (token) => {
    let query = "SELECT * FROM User WHERE passwordResetToken =?";
    let user = await getOne({
        db: db,
        query,
        params: [token]
    });
    console.log(user);
    const exp = user.passwordResetExpiration;
    const now = new Date();
    console.log(exp);
    if (exp < now) return null;
    return user;

}
const getUserByEmail = async (email) => {
    let query = "SELECT * FROM User WHERE email =?";
    let user = await getOne({
        db: db,
        query,
        params: [email]
    });
    return user;

}
const createUser = (body) => {
    const [name, age, gender] = body
    console.log(name)
    let query = "INSERT INTO User(name,gender,age) VALUES (?,?,?)";
    let isCreated = create({
        db: db,
        query,
        params: [name, gender, age]

    })
    return isCreated;
}
const updateUser = (user) => {
    const name = user.name;
    const age = user.age;
    const gender = user.gender;
    const id = req.params.id;
    let query = `UPDATE User
        SET name = ?, 
        gender=?,
        age =?
        WHERE id =?;`
    let isUpdated = connection.query(query, [name, gender, age, id])
        .then(() => {
            return true;
        })
        .catch(err => {
            console.log(err);
            return false;
        });
    return isUpdated
}
const updateToken = (user, token) => {
    const id = user.id;
    const now = new Date();
    const exp = new Date(now.getTime() + 15 * 60 * 1000).toLocaleTimeString();
    console.log(exp);
    let query = `UPDATE User SET passwordResetToken = ?, passwordResetExpiration=?  WHERE id =?;`
    let isUpdated = connection.query(query, [token, exp, id])
        .then(() => {
            return true;
        })
        .catch(err => {
            console.log(err);
            return false;
        });
    return isUpdated

}
const resetPassword = (password, user) => {
    const id = user.id;

    let query = `UPDATE User SET password = ? WHERE id =?;`
    let isUpdated = connection.query(query, [password, id])
        .then(() => {
            return true;
        })
        .catch(err => {
            console.log(err);
            return false;
        });
    return isUpdated

}
const deleteUser = (id) => {
    let query = `DELETE FROM User WHERE id =?;`;
    let isDeleted = connection.query(query, [id])
        .then(() => {
            return true;
        })
        .catch(err => {
            console.log(err);
            return false;
        });
    return isDeleted;
}

module.exports = {
    getAllUsers,
    createUser,
    deleteUser,
    getUserById,
    updateUser,
    getUserByEmail,
    updateToken,
    getUserByToken,
    resetPassword
}

