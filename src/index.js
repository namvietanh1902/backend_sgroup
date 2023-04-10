const express = require('express')
const app = express();
const userRouter = require('./router/router')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/user", userRouter)

app.listen(3000, () => {
    console.log("App server on http://localhost:3000")
})
