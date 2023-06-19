const pollService = require('../services/pollService');
const createPoll = async (req, res) => {
    const { question, options } = req.body;
    const createdBy = req.session.sub;

    const pollData = {
        question,
        createdBy
    };
    const pollCreated = await pollService.createPoll(pollData, options);
    return res.status(200).json({
        poll: pollCreated
    })
}
const getPollDetail = async (req, res) => {
    const id = req.params.id;
    const poll = await pollService.getPollDetail(id);
    return res.status(200).json({ poll })
}
const updatePoll = async (req, res) => {
    const id = req.params.id;
    const question = req.body.question;
    const isUpdated = await pollService.updatePoll(question, id);
    if (isUpdated) {
        return res.status(204);
    }
    return res.status(400).json(
        { message: "Update failed" }
    );
}
const removePoll = async (req, res) => {
    const id = req.params.id;
    const isDeleted = await pollService.deletePoll(id);
    if (isDeleted) {
        return res.status(204);
    }
    return res.status(400).json(
        { message: "Delete failed" }
    );
}
const submitOption = async (req, res) => {
    const optionId = Number(req.params.id);
    const userId = req.session.id;
    const isSubmit = await pollService.submitOption(optionId, userId);
    if (isSubmit) {
        return res.status(201).json({
            message: "Submit option successfully"
        });
    }
    return res.status(400).json({
        message: "Bad Request"
    })


}
const unsubmitOption = async (req, res) => {
    const optionId = req.params.id;
    const userId = req.session.id;
    const isSubmit = await pollService.unsubmitOption(optionId, userId);
    if (isSubmit) {
        return res.status(204).json();
    }
    return res.status(400).json({
        message: "Bad Request"
    })

}
module.exports = {
    createPoll,
    getPollDetail,
    updatePoll,
    removePoll,
    submitOption,
    unsubmitOption
}