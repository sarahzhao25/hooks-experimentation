'use strict'


//FOR EXPRESS
const express = require('express');
const app = express();
const morgan = require('morgan');
const logger = morgan('dev');
const bodyParser = require('body-Parser');
const nunjucks = require('nunjucks');

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views');
app.use(logger);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'))

//FOR SEQUELIZE
const models = require('./models');
const db = models.db;
const Page = models.Page;
const User = models.User;

User.sync()
    .then(() => { return Page.sync() })
    .then(() => {
        console.log('Pages are synced')
        app.listen(3000, function() {
            console.log("We're listenin' on port 3000!");
        })
    })
    .catch(console.error)

//FOR ROUTES
const router = require('./routes');
app.use('/', router);

app.get('/', (req, res, next) => {
    res.send('Yep, you made it');
})

module.exports = app;
