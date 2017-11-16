'use strict'
const express = require('express');
const UserRouter = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;
const db = models.db;

UserRouter.get('/', (req, res, next) => {
    User.findAll()
        .then((arrayOfUsers) => {
            res.render('userpage', { users: arrayOfUsers });
        })
        .catch(next);
})

UserRouter.get('/:id', (req, res, next) => {
    let theUser;
    User.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((user) => {
            theUser = user;
            return Page.findAll({
                where: {
                    authorId: req.params.id
                }
            })
        })
        .then(arrayOfPages => res.render('user', { pages: arrayOfPages, name: theUser.name, email: theUser.email }))
        .catch(next);

})

module.exports = UserRouter;