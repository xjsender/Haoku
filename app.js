var express = require("express")
    , ejs = require("ejs")
    , path = require('path')
    , jsforce = require("jsforce")
    , underscore = require("underscore")
    , webRouter = require("./routers/web_router")
    , session = require("express-session")
    , bodyParser = require("body-parser")
    , app = express();

app.set("view engine", "html");
app.engine("html", ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 3000);

app.use(express.static("public"));
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'some secret here'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', webRouter);

var server = app.listen(process.env.PORT || 3000, function() {
    var host = server.address().address
    var port = server.address().port
    console.log('Example Node Tree listening at http://%s:%s', host, port)
})