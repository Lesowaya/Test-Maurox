const http = require('http');
const https = require('https');
const fs = require('fs');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');

const privateKey  = fs.readFileSync('key.pem', 'utf8');
const certificate = fs.readFileSync('cert.pem', 'utf8');



var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));
app.use((req, res, next) => {
  return MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
    if (err) {
      return next(err);
    }
    console.log('no error ocured');
    req.conn = client;
    return next();
  });
});
app.use(cookieParser());

app.use('/', indexRouter);

app.use(function(err, req, res, next) {
  if (req.conn) {
    req.conn.close();
  }
  if (err) {
    res.status(err.status || 500).send({ error: true, message: err.message || 'Server issues Try again later.'});
  }
  return false;
});


var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(3000);
httpsServer.listen(8443);