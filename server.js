require("dotenv").config();
const express = require('express')
const app = express()
const port = process.env.PORT_SERVER
app.use(express.json())

const userRouter = require('./api/router/userRouter');

app.use('/users', userRouter);

app.listen(port,() => {
    console.log("Server in running on port ", port);
});