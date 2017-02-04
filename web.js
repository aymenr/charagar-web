var gzippo = require('gzippo');
  var express = require('express');
  var app = express();


  app.use(gzippo.staticGzip("" + __dirname + "/dist"));
  app.listen(process.env.PORT, function() {
  	console.log("EXPRESS SERVER LISTENING ON",this.address().port, app.settings.env)
  });