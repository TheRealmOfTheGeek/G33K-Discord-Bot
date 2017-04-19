const Discord = require("discord.js");
const client = new Discord.Client();
var express = require('express')
var app = express()

var msgs = [];
var jsonfile = require('jsonfile')
var token = jsonfile.readFileSync('/home/ubuntu/.key').token;
console.log('started');
client.on('ready', () => {
  console.log("Logged in as " + client.user.username + "!");
  client.user.setGame("therotg.com/bot");
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
	array_push(msgs, m);
	console.log(m);
  }
  var a = content.split(" ");
  var cmd = a[0];
  if (cmd == "g33k" || cmd == "geek") {
	msg.reply("Hello!");
  }
});
client.login(token);
console.log('logged in');


app.get('/', function (req, res) {
  h = '';
  msgs.forEach(function (msg) {
	  h = h + msg;
  });
  res.send(h);
  console.log('Access from ' + req.connection.remoteAddress);
});
app.listen(3434, function () {
  console.log('Example app listening on port 3434!')
});
