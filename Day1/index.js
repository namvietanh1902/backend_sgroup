const express = require('express')
const app = express();
const router = require('./router')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/", router)

app.listen(3000, () => {
    console.log("App server on http://localhost:3000")
})
