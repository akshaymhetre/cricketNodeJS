exports.getUpcomingMatches = function(){
    var YQL = require("yql");
    new YQL.exec('select * from cricket.upcoming_matches', function (response) {
       return response;
    }, {
        "env" : 'store://0TxIGQMQbObzvU4Apia0V0'
    });
};


exports.getLiveScores = function(){
    var YQL = require("yql");
    new YQL.exec('select * from cricket.scorecard.live', function (response) {
       return response;
    }, {
        "env" : 'store://0TxIGQMQbObzvU4Apia0V0'
    });
};

exports.getLiveScoresSummery = function () { 
    var YQL = require("yql");
    new YQL.exec('select * from cricket.scorecard.live.summary', function (response) {
       return response;
    }, {
        "env" : 'store://0TxIGQMQbObzvU4Apia0V0'
    });
}


exports.getUpcomingMatches1 = function(req, res){
    var YQL = require("yql");
    new YQL.exec('select * from cricket.upcoming_matches', function (response) {
       res.send(response);
    }, {
        "env" : 'store://0TxIGQMQbObzvU4Apia0V0'
    });
};


exports.getLiveScores1 = function(req, res){
    var YQL = require("yql");
    new YQL.exec('select * from cricket.scorecard.live', function (response) {
       res.send(response);
    }, {
        "env" : 'store://0TxIGQMQbObzvU4Apia0V0'
    });
};

exports.getCricketNews1 = function (req, res) { 
    var YQL = require("yql");
    new YQL.exec('select * from cricket.news where region="in"', function (response) {
       res.send(response);
    }, {
        "env" : 'store://0TxIGQMQbObzvU4Apia0V0'
    });
}

exports.getTeamInfo = function (req, res) { 
    var YQL = require("yql");
    new YQL.exec('select * from cricket.teams', function (response) {
       res.send(response);
    }, {
        "env" : 'store://0TxIGQMQbObzvU4Apia0V0'
    });
}
