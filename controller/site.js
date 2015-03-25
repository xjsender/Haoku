var jsforce = require("jsforce")
    , session = require("express-session")
    , _ = require("underscore")._
    , array2table = require("../lib/array2table");

exports.index = function(req, res, next) {
    if (req.session.accessToken) {
        var conn = new jsforce.Connection({
            accessToken: req.session.accessToken,
            instanceUrl: req.session.instanceUrl
        });

        soql = "SELECT UserName FROM User WHERE Id = '{0}'".format(req.session.userId);
        conn.query(soql , function(err, resp) {
            if (err) return next(err);

            req.session.userName = resp.records[0].Username;
            res.locals.session = req.session;
        });
    }

    console.log(req.session);
    res.render('index');
}

exports.about = function(req, res, next) {
    res.render('about');
}

exports.query = function(req, res, next) {
    res.render("query", {
        html_table: []
    });
}

exports.doQuery = function(req, res, next) {
    var soql = req.body.soql;

    if (!req.session || !req.session.accessToken) {
        return res.redirect('/');
    }

    var conn = new jsforce.Connection({
        accessToken: req.session.accessToken,
        instanceUrl: req.session.instanceUrl
    });

    conn.query(soql, function(err, resp) {
        if (err) {
            res.locals.hasMessage = true;
            res.locals.messages = err;

            res.render("query", {
                html_table: ""
            })
        }

        html_table = array2table(resp.records, 'queryResult', 'table', req.session);
        
        res.render("query", {
            html_table: html_table
        });
    });
}