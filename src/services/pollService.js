
const { knex } = require('../database/knex_connection')
const createPoll = async (pollData, options) => {
    console.log(pollData, options)
    knex.transaction(function (trx) {
        knex('Poll').insert(pollData)
            .then(function (resp) {

                const id = resp[0];
                console.log(id, resp)
                const optionsData = options.map((element) => {
                    console.log(element)
                    return {
                        pollId: id,
                        ...element
                    }
                })
                return knex('Option').insert(optionsData);
            })
            .then(trx.commit)
            .catch(trx.rollback);
    })
        .then(function (resp) {
            console.log('Transaction complete.');
        })
        .catch(function (err) {
            console.error(err);
        });


}
const getPollDetail = async (id) => {
    const poll = await knex
        .select('poll.id', 'poll.question', 'option.content')
        .from('poll')
        .innerJoin('option', 'poll.id', 'option.pollId')
        .then((rows) => {
            const polls = rows.reduce((acc, row) => {
                const { id, question, content } = row;
                const poll = acc.find((p) => p.id === id);
                if (poll) {
                    poll.options.push(content);
                } else {
                    acc.push({ id, question, options: [content] });
                }
                return acc;
            }, []);

            return polls;
        })
        .catch((error) => {
            console.error(error);
        });

    return poll;
}
const updatePoll = async (question, id) => {
    const poll = await knex("Poll")
        .select("*")
        .where("id", id);
    if (!poll) {
        return false;
    }
    const isUpdated = await knex("Poll")
        .where('id', id)
        .update({ question });
    return isUpdated;

}

const removePoll = async (id) => {
    const poll = await knex("Poll")
        .select("*")
        .where("id", id);
    if (!poll) {
        return false;
    }
    const isDeleted = await knex("Poll")
        .where("id", id)
        .del();
    return isDeleted;

}
const submitOption = async (optionId, userId) => {
    const isSubmit = await knex("users_options")
        .insert({
            userId: userId,
            optionId: optionId
        });
    return isSubmit;

}
const unsubmitOption = async (optionId, userId) => {
    const isExist = await knex("users_options")
        .select("*")
        .where("userId", userId)
        .andWhere("optionId", optionId);
    if (isExist) return false;

    const isUnsubmit = await knex("users_options")
        .where("userId", userId)
        .andWhere("optionId", optionId)
        .del();
    console.log(isUnsubmit)
    return isUnsubmit;

}
module.exports = {
    createPoll,
    updatePoll,
    removePoll,
    submitOption,
    unsubmitOption,
    getPollDetail
}