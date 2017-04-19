const Discord = require("discord.js");
//var request = require('request');
const client = new Discord.Client();
var express = require('express')
var app = express()

function htmlentities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
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
    guild.channels.get(guild.id).sendMessage("Welcome " + member.toString() + " to the group!");
    //newUsers = new Discord.Collection();
  // good?
});

// Commands
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
  var a = content.toLowerCase().split(" ");
  var cmd = a[0];
  var arg1 = a[1];
  if (cmd == "g33k" || cmd == "geek") {
	if(arg1 == null) {
		msg.reply("Hello!");
	} else if(arg1 == "introduce") {
		msg.channel.sendMessage("", {embed: {
		  color: 3447003,
		  description: "I am G33K, a bot made by Kento (with the help of Nick)! I was first created on 19/04/2017, and am totally open source (https://therotg.com/pshort/bot), so go ahead and fork me!"
		}});
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
