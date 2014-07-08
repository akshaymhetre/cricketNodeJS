
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , api = require('./routes/api')
  , http = require('http')
  , path = require('path')
  , ejsMiddleware = require('ejs-middleware')
  , yql = require('yql')  
  , faye = require('faye')  
  , cors = require(path.join(__dirname,'modules','cores'));

var bayeux = new faye.NodeAdapter({
  mount:    '/cricket',
  timeout:  45
});

var app = express();

app.configure(function () {
    app.use(cors);
    app.set('port', process.env.PORT || 3000);
    app.set('view engine', 'ejs');    
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(ejsMiddleware(__dirname, 'html', app));
    app.use(bayeux);       
});



app.configure('development', function(){
  app.use(express.errorHandler());
});

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
  io.sockets.emit('this', { will: 'be received by everyone'});

  setTimeout(function() {
      io.sockets.emit('upcomingMatches', api.getUpcomingMatches());
      io.sockets.emit('liveScores', api.getLiveScores());
      io.sockets.emit('liveScoresSummery', api.getLiveScoresSummery());
  }, 5000 );

});


app.get('/', routes.index);
app.get('/cricket/upcomingMatches', api.getUpcomingMatches1);
app.get('/cricket/liveScores', api.getLiveScores1);
app.get('/cricket/liveScoresSummery', api.getLiveScoresSummery);
app.get('/cricket/news', api.getCricketNews1);
app.get('/cricket/team', api.getTeamInfo);
