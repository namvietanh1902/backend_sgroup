const connection = require('../database/connection')
const userService = require('../services/userService')
const getAllUsers = async (req, res) => {
    const page = req.query.page;

    const users = await userService.getAllUsers(page);
    return res.status(200).json(users);


}
const searchUser = async (req, res) => {
    const page = req.query.page;
    const search = req.query.query;
    const users = await userService.searchUser(page, search);

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

const updateUser = async (req, res) => {
    const user = req.body;
    const id = req.params.id;
    const UpdatedBy = req.session.sub;
    const isUpdated = await userService.updateUser(user, id, UpdatedBy);
    if (!isUpdated) {
        res.status(401).json({
            message: "Cant update user"
        })
    }
    return res.status(204).json({
        message: "Updated a user"
    });

}
const deleteUser = async (req, res) => {

    let id = req.params.id;
    const isDeleted = await userService.deleteUser(id);
    if (!isDeleted) {
        return res.status(401).json({
            message: "Cannot delete user"
        });
    }
    return res.status(204).json({
        message: "Deleted a user"
    });

}

module.exports = {
    getAllUsers,
    deleteUser,
    getUserById,
    updateUser,
    searchUser

}

