const Discord = require("discord.js");
var request = require('request');
const client = new Discord.Client();
var express = require('express')
var app = express();
var fs = require('fs');
//var words = fs.readFileSync('/home/ubuntu/rude.txt').toString().split("\n");
var badwords = [];
var lineReader = require('readline').createInterface({
input: require('fs').createReadStream('home/ubuntu/rude.txt');
});

lineReader.on('line', function (line) {
badwords.push(line);
});

console.log(words);
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
	    // do we need to use yourls when they don't see the url ?? If its easier, we can just replace the chat links with shorter ones (aka the ones they see in Discord)
        return '<a target="_blank" href="' + url + '">' + iurl + '</a>';
    })
}

var msgs = [];
var jsonfile = require('jsonfile')
var token = jsonfile.readFileSync('/home/ubuntu/.key').token;
console.log('started');
client.on('ready', () => {
  console.log("Logged in as " + client.user.username + "!");
  client.user.setGame("therotg.com/bot");
});

// On person join
newUsers = new Discord.Collection();
client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
    guild.channels.get(guild.id).sendMessage("Welcome " + member.toString() + " to the group! If you need any info about me, Kento, or Nick, please type 'g33k introduce <yourself/kento/nick>'");
    //newUsers = new Discord.Collection();
  // good?
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
// Swear detection
	var responses = [
	"cool people don't curse.",
	"please don't swear.",
	"swearing is not tolerated here.",
	"you could use another word..",
	"really? Did you read the rules??",
	"I'm ashamed."
	]
	// So do u know how to change suuup to sup?
	badwords.forEach(function(bw) {
		if(msg.content.toLowerCase().includes(bw.toString())) {
			var whichone = Math.floor((Math.random() * responses.length) + 1);

			msg.delete();
			msg.reply(responses[whichone]);
		)}
	});
  // Commands	// it was working before lol ik
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

  if (cmd == "g33k" || cmd == "geek") {
	if(arg1 == null) {
		msg.reply("Hello! If you need help, please type 'geek help'.");
	} 
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
	
	else if(arg1 == "invite") {
		var inv = client.invite();
		msg.reply("Your invite code is: " + inv.toString());
	}
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
  console.log('Example app listening on port 3434!')
});
