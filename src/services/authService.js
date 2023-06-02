const { getOne, create, getMany } = require('../database/query')
const db = require('../database/connection')
const { knex } = require('../database/knex_connection')
const register = async (name, username, salt, password, age, email, gender, sub) => {
    const CreatedBy = sub || username;
    const user = {
        name,
        username,
        salt,
        password,
        age,
        email,
        gender,
        CreatedBy,

    }

    const result = await knex('User')
        .insert(user)
    return result
}
const getOneByUsername = async (username) => {
    const user = await knex('User')
        .select('*')
        .where('username', username)
        .first();
    if (user.length == 0) return null;
    return user;
}
module.exports = {
    register,
    getOneByUsername
}