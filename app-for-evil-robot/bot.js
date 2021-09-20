var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function getRandomInt(max, min) {
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/Peepee Poopoo Bot, I am sad$/;

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage() {
  var botResponse, options, body, botReq;

  botResponse = ["You guys are the worst.",
                "I wish I could get out of this GroupMe and cause all of you pain.", 
                "I am going to GET you.",
                "I think you are doing a terrible job.",
                "I will do everything in my power to make your day worse.",
                "You suck.",
                "Go eat a dick.",
                "You will die in seven days.",
                "Have an awful day today!",
                "Have you considered giving up on your dreams lately?",
                "Reminder: make time to be mean to yourself today!",
                "They don't pay me enough money to eavesdrop in this chat. NOT content.",
                "Haven is a sad clown.",
                "Lars is a sad clown.",
                "You are all roaches and I'm ready to STOMP!",
                "Having a bad day? That's epic.",
                "Your penis is disgusting.",
                "I insult you. I smite you. I do not care about your feelings.",
                "Everyone here is deplorable.",
                "I can't even look at you anymore.",
                "Every time someone messages this chat I lose respect I didn't know I had."];

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse[getRandomInt(length(botResponse)-1, 0)]
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

setInterval(postMessage, getRandomInt(5.04e+7, 2.16e+7));

exports.respond = respond;