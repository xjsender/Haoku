var express = require("express")
    , site = require("../controller/site")
    , account = require("../controller/account")
    , router = express.Router()

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.locals.session = req.session;
        next();
    });

    app.get('/', site.index);
    app.post('/login', site.login);
    app.get('/about', site.about);
    app.get('/oauth/callback', site.callback);
    app.get('/account/o', account.list);
    app.get('/account/:id', account.view);
}