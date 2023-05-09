const express = require('express')
const app = express();
const userRouter = require('./router/userRouter')
const authRouter = require('./router/authRouter')
const resetRouter = require('./router/password-reset.router')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRouter);
app.use("/auth", authRouter)
app.use("/password-reset", resetRouter)

app.listen(3000, () => {
    console.log("App server on http://localhost:3000")
})
