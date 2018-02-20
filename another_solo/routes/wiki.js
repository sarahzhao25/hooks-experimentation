const express = require('express');
const wikiRouter = express.Router();

wikiRouter.get('/add', (req, res, next) => {
    res.render("addpage");
})

wikiRouter.get('/', (req, res, next) => {
    res.redirect('/');
})

wikiRouter.post('/', (req, res, next) => {
    res.json(req.body);
})


module.exports = wikiRouter;