var express = require("express"),
    http = require('http'),
    whois = require('dns-middleware'),
    app = express(),
    server = http.createServer(app);

app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.get("/*", function (req, res) {
    res.render('view');
});

app.post('/*', whois, function (req, res) {
    res.send(req.data);
});

app.use(function(req, res, next){
    res.send(420, 'Slow down bro.');
});
 
server.listen(3009);
