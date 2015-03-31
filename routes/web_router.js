var express = require("express")
    , entry = require("../controller/entry")
    , login = require("../controller/login")
    , query = require("../controller/query")
    , rest = require("../controller/rest")
    , account = require("../controller/object/account")
    , config = require("../config")

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.locals.session = req.session;
        res.locals.fields = config.fields;
        res.locals.soqls = req.session.soqls || [];
        next();
    });

    app.get('/', entry.index);
    app.get('/about', entry.about);

    // Query routes
    app.get('/query', query.query);
    app.post('/query', query.doQuery);

    // http://download.csdn.net/detail/wolf_410/5927367
    // REST routes
    app.get('/jsonu', entry.json);
    app.get('/rest', rest.rest);
    app.post('/rest', rest.executeRest);

    // Login routes
    app.post('/login', login.login);
    app.get('/logout', login.logout);
    app.get('/oauth/callback', login.callback);

    app.get('/Account/o', account.list);
    app.get('/Account/:id', account.view);
    app.get('/Account/:id/edit', account.edit);
    app.delete('/Account/:id/del', account.delete);
}