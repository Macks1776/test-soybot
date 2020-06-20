var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;
var botResponseGlobal;
var health = 3;
function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/cool guy$/,
      botRegexSup = /^\Sup$/,
      botRegexHit = /^\Punch$/,
      botRegexCall = /^\@BigFuckus$/;
  if(request.text && botRegexCall.test(request.text)) {
        if(request.text && botRegex.test(request.text)) {
            this.res.writeHead(200);
            postMessage();
            this.res.end();  
            }
        else if(request.text && botRegexSup.test(request.text)) {
             this.res.writeHead(200);
             botResponseGlobal = "Fuck Off Randy";
             postMessage();
             this.res.end();
        }
        else if(request.text && botRegexHit.test(request.text)) {

             if(health != 0){
                health --;
                this.res.writeHead(200);
                botResponseGlobal = "Ouch! Fuck";
                postMessage();
                this.res.end();
             }
            else{
                this.res.writeHead(200);
                botResponseGlobal = "IM Dead";
                postMessage();
                this.res.end();
            }
        }
        else {
            console.log("don't care");
            this.res.writeHead(200);
            botResponseGlobal = "What?";
            postMessage();
            this.res.end();
        }
  }
}

function postMessage() {
  var botResponse, options, body, botReq;
  botResponse = botResponseGlobal;
  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
