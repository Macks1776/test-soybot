var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;
var botResponseGlobal = "rock";
var health = 3;
var uname = "you";
var gameOn = 0;

function getRandomInt() {
  console.log("Getting Random Int");
  var num =  Math.floor(Math.random() * Math.floor(3));
  console.log(num);
  return num;
}

function rps(){
  console.log("Testing RPS");
  botRegexR = /Rock/i;
  botRegexP = /Paper/i;
  botRegexS = /Scissors/i;
  switch(getRandomInt())
      
                    {
                        case 0:
                            console.log("CPU chose ROCK");
                            if(botRegexR.test(botResponseGlobal))
                            {
                                console.log("DRAW!!");
                                botResponseGlobal = "Player Chose " +botResponseGlobal+" I Chose Rock "+" Its a Draw";
                                postMessage();
                               // console.log("Score: Player {0} - {1}", playerScore, cpuScore);
                            }
                            else if (botRegexP.test(botResponseGlobal))
                            {
                                console.log("PLAYER WINS!!");
                                botResponseGlobal = "Player Chose " +botResponseGlobal+" I Chose Rock "+" You Win";
                                postMessage();
                                //playerScore++;
                                //console.log("Score: Player {0} - {1}", playerScore, cpuScore);
                            }
                            else if (botRegexS.test(botResponseGlobal))
                            {
                                console.log("CPU WINS!!");
                                botResponseGlobal = "Player Chose " +botResponseGlobal+" I Chose Rock "+" I Win";
                                postMessage();
                                //cpuScore++;
                                //console.log("Score: Player {0} - {1}", playerScore, cpuScore);
                            }
                            break;

                        case 1:
                            console.log("CPU chose PAPER");
                            if (botRegexR.test(botResponseGlobal))
                            {
                                console.log("CPU WINS");
                                botResponseGlobal = "Player Chose " +botResponseGlobal+" I Chose Paper "+" I Win";
                                postMessage();
                                //cpuScore++;
                                //console.log("Score: Player {0} - {1}", playerScore, cpuScore);
                            }
                            else if (botRegexP.test(botResponseGlobal))
                            {
                                console.log("DRAW!!");
                                botResponseGlobal = "Player Chose " +botResponseGlobal+" I Chose Paper "+" Its a Draw";
                                postMessage();
                                //console.log("Score: Player {0} - {1}", playerScore, cpuScore);
                            }
                            else if (botRegexS.test(botResponseGlobal))
                            {
                                console.log("PLAYER WINS!!");
                                botResponseGlobal = "Player Chose " +botResponseGlobal+" I Chose Paper "+" You Win";
                                postMessage();
                                //playerScore++;
                                //console.log("Score: Player {0} - {1}", playerScore, cpuScore);
                            }
                            break;

                        case 2:
                            console.log("CPU chose SCISSORS");
                            if (botRegexR.test(botResponseGlobal))
                            {
                                console.log("PLAYER WINS");
                                botResponseGlobal = "Player Chose " +botResponseGlobal+" I Chose Scissors "+" You Win";
                                postMessage();
                                //playerScore++;
                                //console.log("Score: Player {0} - {1}", playerScore, cpuScore);
                            }
                            else if (botRegexP.test(botResponseGlobal))
                            {
                                console.log("CPU WINS!!");
                                botResponseGlobal = "Player Chose " +botResponseGlobal+" I Chose Scissors"+" I Win";
                                postMessage();
                                //cpuScore++;
                                //console.log("Score: Player {0} - {1}", playerScore, cpuScore);
                            }
                            else if (botRegexS.test(botResponseGlobal))
                            {
                                console.log("DRAW!!");
                                botResponseGlobal = "Player Chose " +botResponseGlobal+" I Chose Scissors "+" Its a Draw";
                                postMessage();
                                //console.log("Score: Player {0} - {1}", playerScore, cpuScore);
                            }
                            break;
                    }
  gameOn = 0;
}

function respond() {
  console.log(this.req.body);
  uname = this.req.body.name;
  var request = JSON.parse(this.req.chunks[0]);
  var botRegex = /cool guy/i;
  var botRegexSup = /Sup/i;
  var botRegexHit = /Punch/i;
  var botRegexCall = /@BigFuckus/i;
  var botRegexGame = /Game/i;
  
  if(gameOn == 1){
    var botRegexR = /Rock/i;
    var botRegexP = /Paper/i;
    var botRegexS = /Scissors/i;
    if((botRegexR.test(request.text)||botRegexP.test(request.text)||botRegexS.test(request.text))&& (this.req.body.name != "Big Fuckcuss II")){
      botResponseGlobal = request.text;
      rps(); 
    }else if(this.req.body.name != "Big Fuckcuss II"){
             this.res.writeHead(200);
             botResponseGlobal = "You need to Say Rock Paper or Scissors you dickhead";
             postMessage();
             this.res.end();
    }
  }
  else if(request.text && botRegexCall.test(request.text)) {
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
             this.res.writeHead(200);
             botResponseGlobal = "Game On "+uname+" Rock, Paper, Scissors.. Shoot";
             postMessage();
             this.res.end();
             gameOn = 1;
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
