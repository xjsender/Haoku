var express = require("express")
    , ejs = require("ejs")
    , path = require('path')
    , jsforce = require("jsforce")
    , underscore = require("underscore")
    , webRouter = require("./routes/webRouter")
    , session = require("express-session")
    , bodyParser = require("body-parser")
    , router = express.Router()
    , app = express();

app.set("view engine", "html");
app.engine("html", ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 3000);

app.use(express.static("public"));
app.use(session({
    secret: 'hao.liu',
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    cookie: { maxAge: 900000 }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// expose the "messages" local variable when views are rendered
app.use(function(req, res, next) {
    var msgs = req.session.messages || [];

    // expose "messages" local variable
    res.locals.message = msgs;

    // expose "hasMessages"
    res.locals.hasMessage = !!msgs.length;

    // expose "notLogin"
    res.locals.notLogin = !req.session || !req.session.accessToken;

    next();
});

webRouter(app);
app.use(router);

var server = app.listen(process.env.PORT || 3000, function() {
    var host = server.address().address
    var port = server.address().port
    console.log('Node Tree listening at http://%s:%s', host, port)
});