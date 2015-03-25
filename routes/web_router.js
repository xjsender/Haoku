var express = require("express")
    , site = require("../controller/site")
    , login = require("../controller/login")
    , account = require("../controller/object/account");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.locals.session = req.session;
        next();
    });

    app.get('/', site.index);
    app.get('/about', site.about);
    app.get('/query', site.query);
    app.post('/query', site.doQuery);

    app.post('/login', login.login);
    app.get('/logout', login.logout);
    app.get('/oauth/callback', login.callback);

    app.get('/account/o', account.list);
    app.get('/account/:id', account.view);
}