const { knex } = require('../database/knex_connection');
const addOption = async (option, pollId) => {
    const isAdded = await knex("Option")
        .insert({
            pollId: pollId,
            content: option

        });
    return isAdded;


}
const removeOption = async (id) => {
    const isDeleted = await knex("Option")
        .where("id", id)
        .del();
    return isDeleted;

}
const editOption = async (id, content) => {
    const isEdit = await knex("Option")
        .where("id", id)
        .update({
            content
        });
    return isEdit;
}
module.exports = {
    addOption,
    removeOption,
    editOption
}