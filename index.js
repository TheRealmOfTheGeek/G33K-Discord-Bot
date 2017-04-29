const Discord = require("discord.js");
var request = require('request');
const client = new Discord.Client();
var express = require('express');
var app = express();
var fs = require('fs');
var concat = require('concat-stream');
var strawpoll = require('strawpoll');
 var JSONStream = require('JSONStream');

var voting = 0;

var badwords = [];
var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('/home/ubuntu/rude.txt')
});
lineReader.on('line', function (line) {
	badwords.push(line.toString());
});

function htmlentities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function removeduplicates(txt) {
	return txt;
}
function urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(iurl) {
	    url = 'https://therotg.com/go.php?url=' + encodeURIComponent(iurl);
        return '<a target="_blank" href="' + url + '">' + iurl + '</a>';
    });
}

var msgs = [];
var jsonfile = require('jsonfile')
var token = jsonfile.readFileSync('/home/ubuntu/.key').token;
console.log('started');
client.on('ready', () => {
  console.log("Logged in as " + client.user.username + "!");
  client.user.setGame("@kvizdos");
});

// On person join
newUsers = new Discord.Collection();
client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
    guild.channels.get(guild.id).sendMessage("Welcome " + member.toString() + " to the group! If you need any info about me, Kento, or Nick, please type 'g33k introduce <yourself/kento/nick>'");
});

client.on('message', msg => {
  user = msg.author;
  username = user.username;
  content = msg.content;
  channel = msg.channel;

  if (channel.type != 'text') {
	console.log('DM ' + username + ': ' + content);
  } else {
	channelname = channel.name;
	server = channel.guild;
	servername = server.name;
	m = servername + ' #' + channelname + ', ' + username + ': ' + content;
	msgs.push(m);
	console.log(m);
  }
	  // Commands
	  var a = content.toLowerCase().split(" ");
	  var cmd = a[0];
	  var arg1 = a[1];
	  var arg2 = a[2];
	  var arg3 = a[3];
	  var arg4 = a[4];
	  var arg5 = a[5];
	  var arg6 = a[6];
	  var arg7 = a[7];
	  var arg8 = a[8];
	  var arg9 = a[9];
	  var arg10 = a[10];

	// gtg and hello
	if(msg.content.toLowerCase().includes("gtg")) {
		msg.channel.sendMessage("Cya later, " + user.toString());
	}
	// Send Amazon Affiliate Link
	if(msg.content.toLowerCase().includes("amazon.com")) {
		msg.channel.sendMessage("Please click Kentos Amazon Affiliate Link when purchasing things to help support him (and keep me alive)! http://amzn.to/2paY7Vs");   
	}
	// set role
	
	// Main commands
	if(msg.content.toLowerCase().includes("geek") && msg.content.toLowerCase().includes("hate you") || msg.content.toLowerCase().includes("bitch")) {
		var responses = [
		"Ouch.",
		"that hurts my feelings ;( -10",
		"no need to say that..",
		"meany",
		";("
		];
		var whichone = Math.floor((Math.random() * responses.length));

		msg.reply(responses[whichone]);
	}
	/*if(msg.content.toLowerCase().includes("!role") {
		if(arg1 === null) {
			msg.reply("Please do '!role <web/java/c>'");
		}
		if(arg1 == "web") {
			msg.reply("You're now a Basic Web Dev!");
		}
	}*/

  if (cmd == "g33k" || cmd == "geek") {

	if(arg1 == null) {
		msg.reply("Hello! If you need help, please type 'geek help'.");
	} 
	// Set role
	//else if(arg1 == "role") {
	//	if(arg2 == null) {
	//		msg.reply("Please do 'geek role <web/java/c>'");
	//	} else if(arg2 == "web") {
	//		msg.reply("You're now a web dev!");
	//		msg.guild.member
	//	}
	//}
	// Introduction
	else if(arg1 == "introduce") {
		if(arg2 == null) {
			msg.channel.sendMessage("Introduce whome? Myself or Kento? (syntax: G33k introduce <yourself/kento/nick)");	
		} else 	if(arg2 == "yourself") {
			msg.channel.sendMessage("", {embed: {
			  color: 3447003,
			  description: "I am G33K, a bot made by Kento (with the help of Nick)! I was first created on 19/04/2017, and am totally open source (https://therotg.com/pshort/bot), so go ahead and fork me!"
			}});
		} else 	if(arg2 == "kento") {
			msg.channel.sendMessage("", {embed: {
			  color: 3447003,
			  description: "Kento is a teenaged developer, 13, who enjoys coding, making YouTube tutorials, and having fun on Discord! For more info, please visit https://therotg.com!"
			}});
		} else if (arg2 == "nick") {
			
			request('https://api.nick.tools/info', function (error, response, body) {
			  if (response.statusCode == 200) {
				  body = JSON.parse(body);
				msg.channel.sendMessage("", {embed: {
				  color: 3447003,
				  description: body.info
				}});
			  } else {
				msg.channel.sendMessage("", {embed: {
				  color: 3447003,
				  description: "Error while getting nick's info (please direct message @nick2017#6846) :("
				}});
			  } 
			});
		}
	}
	else if(arg1 == "vote") {
		if(arg2 === null || arg3 === null) {
			msg.reply("Please type '"+cmd.toString()+" vote ab <question 1>|<question 2>'");
		} else if(arg2 == "ab" && arg3 === null) {
			msg.reply("Please type '"+cmd.toString()+" vote ab <question 1>|<question 2>'");
		} else if(arg3 !== null) {
			var cmd = msg.content.toString();
			var vote = cmd.substr(cmd.indexOf(" ") + 8);
			var votable = vote.split('-');

			var q1 = votable[0];
			var q2 = votable[1];
			
			msg.channel.sendMessage("a vote has started for: A) " + q1 + " OR B) " + q2).then(sentMessage => {
				sentMessage.react("🇦");
				sentMessage.react("🅱");
			});
			
			
		}
	} 
	else if(arg1 == "stats") {
		if(arg2 === null) {
			return;
		} else if(arg2 == "youtube") {
			request('https://api.nick.tools/youtubechannel?id=UCuX4KZBMpQLToSwJWy-jCBw', function (error, response, body) {
		       if (response.statusCode == 200) {
			   body = JSON.parse(body);
			 msg.channel.sendMessage("", {embed: {
			   color: 3447003,
			   description: "**Kento Currently Has:**\n " + body.channel.stats.subs + " Subscribers\n" + body.channel.stats.views + " views\n" + body.channel.stats.videos + " videos.\n Add to the stats by subscribing to: https://www.youtube.com/user/TheRealmOfTheGeek/"
			 }});
		       } else {
			 msg.channel.sendMessage("", {embed: {
			   color: 3447003,
			   description: "Error while getting kento's yt info :("
			 }});
		       } 

		     });
		} else {
			msg.reply("Stats for what? Syntax: '"+cmd.toString()+" stats <youtube>'");
		}
	}  
	else {
		msg.reply("error 404: command not found. Please type '"+cmd.toString()+" help' for help!");
	}
	
  }

  
});
client.login(token);
console.log('logged in');


app.get('/', function (req, res) {
  h = '<pre>';
  msgs.forEach(function (msg) {
	  h = h + "\n" + urlify(htmlentities(msg));
  });
  h = h + "\n</pre>";
  res.send(h);
  console.log('Access from ' + req.connection.remoteAddress);
});
app.listen(3434, function () {
  console.log('Example app listening on port 3434!');
});


process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err.stack);
});
