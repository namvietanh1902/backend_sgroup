const express = require('express')
const app = express();
const userRouter = require('./router/userRouter')
const authRouter = require('./router/authRouter')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRouter);
app.use("/auth",authRouter)

app.listen(3000, () => {
    console.log("App server on http://localhost:3000")
})
