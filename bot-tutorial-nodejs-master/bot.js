var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;
var botResponseGlobal = "rock";
var health = 3;
var uname = "you";
var gameOn = 0;

function getRandomInt() {
  return Math.floor(Math.random() * Math.floor(3));
}

function rps(){
  console.log("Testing RPS");
  botRegexR = /Rock/i;
  botRegexP = /Paper/i;
  botRegexS = /Scissors/i;
  switch(getRandomInt())
                    {
                        case 1:
                            console.log("CPU chose ROCK");
                            if(botRegexR.test(botResponseGlobal))
                            {
                                console.log("DRAW!!");
                               // console.log("Score: Player {0} - {1}", playerScore, cpuScore);
                            }
                            else if (botRegexP.test(botResponseGlobal))
                            {
                                console.log("PLAYER WINS!!");
                                //playerScore++;
                                //console.log("Score: Player {0} - {1}", playerScore, cpuScore);
                            }
                            else if (botRegexS.test(botResponseGlobal))
                            {
                                console.log("CPU WINS!!");
                                //cpuScore++;
                                //console.log("Score: Player {0} - {1}", playerScore, cpuScore);
                            }
                            break;

                        case 2:
                            console.log("CPU chose PAPER");
                            if (botRegexR.test(botResponseGlobal))
                            {
                                console.log("CPU WINS");
                                //cpuScore++;
                                //console.log("Score: Player {0} - {1}", playerScore, cpuScore);
                            }
                            else if (botRegexP.test(botResponseGlobal))
                            {
                                console.log("DRAW!!");
                                //console.log("Score: Player {0} - {1}", playerScore, cpuScore);
                            }
                            else if (botRegexS.test(botResponseGlobal))
                            {
                                console.log("PLAYER WINS!!");
                                //playerScore++;
                                //console.log("Score: Player {0} - {1}", playerScore, cpuScore);
                            }
                            break;

                        case 3:
                            console.log("CPU chose SCISSORS");
                            if (botRegexR.test(botResponseGlobal))
                            {
                                console.log("PLAYER WINS");
                                //playerScore++;
                                //console.log("Score: Player {0} - {1}", playerScore, cpuScore);
                            }
                            else if (botRegexP.test(botResponseGlobal))
                            {
                                console.log("CPU WINS!!");
                                //cpuScore++;
                                //console.log("Score: Player {0} - {1}", playerScore, cpuScore);
                            }
                            else if (botRegexS.test(botResponseGlobal))
                            {
                                console.log("DRAW!!");
                                //console.log("Score: Player {0} - {1}", playerScore, cpuScore);
                            }
                            break;
                    }
}

function respond() {
  console.log(this.req.body);
  uname = this.req.body.name;
  var request = JSON.parse(this.req.chunks[0]);
  botRegex = /cool guy/i;
  botRegexSup = /Sup/i;
  botRegexHit = /Punch/i;
  botRegexCall = /@BigFuckus/i;
  botRegexGame = /Game/i;
  if(gameOn == 1){
    rps(); 
  }
  if(request.text && botRegexCall.test(request.text)) {
        if(botRegex.test(request.text)) {
            this.res.writeHead(200);
            postMessage();
            this.res.end();  
        }
        else if(botRegexSup.test(request.text)) {
             this.res.writeHead(200);
             botResponseGlobal = "Fuck Off "+uname;
             postMessage();
             this.res.end();
        }
        else if(botRegexHit.test(request.text)) {
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
        else if(botRegexGame.test(request.text)) {
             game = 1;
             this.res.writeHead(200);
             botResponseGlobal = "Game On "+uname+" Rock, Paper, Scissors.. Shoot";
             postMessage();
             rps(); 
             this.res.end();
        }
        else
        {
          this.res.writeHead(200);
          botResponseGlobal = "What?";
          postMessage();
          this.res.end();
      }
  }
  else {
        console.log("don't care");
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
