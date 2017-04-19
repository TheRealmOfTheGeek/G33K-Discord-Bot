const Discord = require("discord.js");
const client = new Discord.Client();
var jsonfile = require('jsonfile')
var token = jsonfile.readFileSync('/home/ubuntu/.key').token;
//console.log(token);
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
	console.log(servername + ' #' + channelname + ', ' + username + ': ' + content);
  }
  if (content == "g33k") {
	msg.reply("Hello!");
  }
});
client.login(token);
console.log('logged in');


