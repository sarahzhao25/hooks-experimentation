'use strict'
const express = require('express');
const WikiRouter = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;
const db = models.db;

WikiRouter.get('/', (req, res, next) => {
    Page.findAll()
        .then((theArrayofPages) => {
            res.render('index', { pages: theArrayofPages });
        })
        .catch(next);
})

WikiRouter.get('/add', (req, res, next) => {
    res.render('addpage');
})

WikiRouter.get('/:page', (req, res, next) => {
    let thePage;
    Page.findOne({
            where: {
                urlTitle: req.params.page
            }
        })
        .then((page) => {
            thePage = page;
            return User.findOne({
                where: {
                    id: page.authorId
                }
            })
        })
        .then((user) => res.render('wikipage', {
            page: thePage,
            user: user
        }))
        .catch(next);
})

WikiRouter.post('/', (req, res, next) => {
    //res.json(req.body);
    let user;
    User.findOrCreate({
            where: {
                name: req.body.name,
                email: req.body.email
            }
        })
        .then((userAndBoolArr) => {
            user = userAndBoolArr[0];
            return Page.create({
                title: req.body.title,
                content: req.body.content,
                status: req.body.status
            })
        })
        .then((thePage) => {
            return thePage.setAuthor(user);
        })
        .then((newPage) => res.redirect(newPage.route))
        .catch(next);
})

module.exports = WikiRouter;