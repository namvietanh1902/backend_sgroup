const { getOne, create, getMany } = require('../database/query')
const db = require('../database/connection')
const register = async (name, username, salt, password, age, email, gender) => {
    const query = "INSERT INTO User(name,username,salt,password,age,email,gender) VALUES (?,?,?,?,?,?,?)";
    const result = await create(
        {
            db,
            query,
            params: [name, username, salt, password, age, email, gender]
        });
    return result
}
const getOneByUsername = async (username) => {
    const query = "SELECT * FROM User WHERE username = ?";
    const user = await getOne({
        db,
        query,
        params: username
    });
    return user;
}
module.exports = {
    register,
    getOneByUsername
}