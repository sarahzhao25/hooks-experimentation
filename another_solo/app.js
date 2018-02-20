//FOR EXPRESS//
const express = require('express');
const app = express();
const PORT = 3000;

//MIDDLEWARE//
const morgan = require('morgan');
const logger = morgan('dev');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', { noCache: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger);
app.use(express.static("public"));

//FOR ROUTES//
const wikiRouter = require('./routes/wiki.js');
const userRouter = require('./routes/user.js');

app.get("/", (req, res, next) => {
    res.send("Hell yeah, you're at localHost:3000 and we're listenin'!");
})

app.use("/wiki", wikiRouter);
app.use("/users", userRouter);

app.use("/", (err, req, res, next) => {
    res.status(500).send("Well damn, look at your error", err);
})

//FOR SEQUELIZE
const models = require('./models');
const Page = models.Page;
const User = models.User;
const db = models.db;

User.sync({ force: true })
    .then(() => {
        return Page.sync({ force: true })
    })
    .then(() => {
        app.listen(PORT, function() {
            console.log("Chillin' with port", PORT);
        })
    })
    .catch(console.log);