const optionService = require("../services/optionService");
const addOption = async (req, res) => {
    try {
        const { content } = req.body;
        const pollId = req.params.id;
        console.log(pollId)
        const option = await optionService.addOption(content, pollId);
        if (option) {
            return res.status(201).json({
                message: "Added an option"
            });
        }

    }
    catch (err) {
        return res.status(400).json(err);
    }
}
const editOption = async (req, res) => {
    try {
        const { content } = req.body;
        const id = req.params.optionId;
        console.log(id)
        const option = await optionService.editOption(id, content);
        if (option) {
            return res.status(204).json();
        }

    }
    catch (err) {
        return res.status(400).json(err);
    }
}
const removeOption = async (req, res) => {
    try {
        const id = req.params.optionId;
        const option = await optionService.deleteOption(id);
        if (option) {
            return res.status(204).json();
        }

    }
    catch (err) {
        return res.status(400).json(err);
    }
}
module.exports = {
    addOption,
    removeOption,
    editOption
}