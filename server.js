var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var PORT = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json());

app.use(express.static('public'));

require("./app/routing/apiRouting")(app);
require("./app/routing/htmlRouting")(app);

app.listen(PORT);


