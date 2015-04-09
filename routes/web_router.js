var express = require("express")
    , entry = require("../controller/entry")
    , login = require("../controller/login")
    , query = require("../controller/query")
    , rest = require("../controller/rest")
    , apex = require("../controller/apex")
    , account = require("../controller/object/account")
    , config = require("../config")

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.locals.session = req.session;
        res.locals.fields = config.fields;
        res.locals.soqls = req.session.soqls || [];
        res.locals.notLogin = !req.session || !req.session.accessToken;
        next();
    });

    app.get('/', entry.index);
    app.get('/about', entry.about);

    // http://download.csdn.net/detail/wolf_410/5927367
    // REST routes
    app.get('/jsonu', entry.json);

    // Query router
    app.route("/query")
        .get(query.index)
        .post(query.executeQuery);

    // Rest router
    app.route("/rest")
        .get(rest.index)
        .post(rest.executeRest);

    // Apex router
    app.route("/apex")
        .get(apex.index)
        .post(apex.executeAnonymous);

    // Login routes
    app.post('/login', login.login);
    app.get('/logout', login.logout);
    app.get('/oauth/callback', login.callback);

    app.get('/Account/o', account.list);
    app.get('/Account/:id', account.view);
    app.get('/Account/:id/edit', account.edit);
    app.delete('/Account/:id/del', account.delete);
}