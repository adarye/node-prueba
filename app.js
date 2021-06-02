const express = require('express');
const app = express();
const sequelize = require('./database/models/index');
var expressLayouts = require('express-ejs-layouts');

// Var de session
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: new Date(Date.now() + (60 * 1000 * 30)) }
}))

app.use(expressLayouts);

app.use(express.static(__dirname + '/public/'));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.set('view engine', 'ejs')


app.use('/', require('./router'));




app.listen(4000, (req, res) => {
    sequelize.sync({ force: false }).then(() => {
        console.log("Base de datos conectada");
    }).catch(error => {
        console.log(error);
    })
})