const router = require('express').Router()
const data = [
    {
        "id": 1,
        "fullname": "Nguyen Huy Tuong",
        "gender": true,
        "age": 18
    },
    {
        "id": 2,
        "fullname": "Nguyen Thi Tuong",
        "gender": false,
        "age": 15
    }

]
router.get("/user", (req, res) => {
    res.status(200).json(data)
})
router.get("/user/:id", (req, res) => {
    const id = req.params.id
    const person = data.find((element) => element.id = id)
    res.status(200).json(person)
})
router.post("/user", (req, res, next) => {
    const id = data.reduce((acc, curr) => {
        return acc > curr.id ? acc : curr.id

    }, 0) + 1

    const person = {
        "id": id,
        "fullname": req.body.fullname,
        "gender": req.body.gender,
        "age": req.body.age

    }
    data.push(person)
    res.status(201).json(person)

})
router.put("/user/:id", (req, res) => {
    const newData = req.body;
    const id = req.params.id;
    const person = data.find((element) => element.id == id)
    person.fullname = newData.fullname;
    person.gender = newData.gender;
    person.age = newData.age
    res.status(204).json({ message: "updated" })



})
router.delete("/user/:id", (req, res) => {
    const id = req.params.id
    console.log(id)
    const person = data.find((element) => element.id == id)
    data.splice(data.indexOf(person), 1)
    res.status(204).json({ message: "deleted" })
})

module.exports = router