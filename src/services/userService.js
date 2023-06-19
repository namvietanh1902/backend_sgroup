const { getOne, create, getMany } = require('../database/query')
const db = require('../database/connection')
const connection = require('../database/connection')
const { knex } = require('../database/knex_connection')

const getAllUsers = async (page) => {
    const perPage = 4;
    const pageIndex = page || 1;
    let users = await knex('User')
        .select('*')
        .offset(perPage * (pageIndex - 1))
        .limit(perPage);
    return users;

}
const searchUser = async (page, query) => {
    const perPage = 4;
    const search = query || '';
    const pageIndex = page || 1;
    console.log(query, pageIndex)
    let users = await knex('User')
        .select('*')
        .whereILike('name', `%${search}%`)
        .offset(perPage * (pageIndex - 1))
        .limit(perPage);

    return users;
}
const getUserById = async (id) => {
    let user = await knex('User')
        .select('*')
        .where('id', id)
    return user;

}
const getUserByToken = async (token) => {
    let user = await knex('User')
        .select('*')
        .where('passwordResetToken', token)
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
const updateUser = async (user, id, UpdatedBy) => {

    const name = user.name;
    const age = user.age;
    const gender = user.gender;

    const newUser = {
        name, age, gender, UpdatedBy
    }

    let isUpdated = await knex('User')
        .where('id', id)
        .update(newUser)
    return isUpdated
}
const updateToken = async (user, token) => {
    const id = user.id;
    const exp = new Date(Date.now() + 30 * 60 * 1000);

    let isUpdated = await knex('User')
        .where('id', id)
        .update({ passwordResetToken: token, passwordResetExpiration: exp });
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
const deleteUser = async (id) => {
    let isDeleted = await knex('User')
        .where('id', id)
        .del()
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
    resetPassword,
    searchUser
}

