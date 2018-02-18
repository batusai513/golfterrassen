var ncp = require("copy-paste");
var shell = require('shelljs');

var s = shell.exec("now ./dist/ --static --public --name golfterrassen");

shell.exec("now alias " + s.stdout + " golfterrassen");

