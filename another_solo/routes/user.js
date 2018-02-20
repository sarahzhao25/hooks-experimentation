const express = require('express');
const userRouter = express.Router();

userRouter.get('/', (req, res, next) => {
    res.send("You made it to users");
})

userRouter.get('/:id', (req, res, next) => {
    res.send("You made it to users");
})

module.exports = userRouter;