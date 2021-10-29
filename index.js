const express = require("express");
const Discord = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");
const client = new Discord.Client();
const config = require("./config.json");
const uptime = require("uptime");
const fly = require("fly");
const ping = require("ping");
client.config = config;
client.queue = new Map()
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT); 


fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync(`./commands/`);

fs.readdirSync('./commands/').forEach(local => {
    const comandos = fs.readdirSync(`./commands/${local}`).filter(arquivo => arquivo.endsWith('.js'))

    for(let file of comandos) {
        let puxar= require(`./commands/${local}/${file}`)

        if(puxar.name) {
            client.commands.set(puxar.name, puxar)
        } 
        if(puxar.aliases && Array.isArray(puxar.aliases))
        puxar.aliases.forEach(x => client.aliases.set(x, puxar.name))
    } 
});

client.on("message", async message => {

    let prefix = config.prefix;
  
      if (message.author.bot) return;
      if (message.channel.type == 'dm') return;     
  
       if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
    
      if(message.author.bot) return;
      if(message.channel.type === 'dm') return;
  
      if(!message.content.startsWith(prefix)) return;
      const args = message.content.slice(prefix.length).trim().split(/ +/g);
  
      let cmd = args.shift().toLowerCase()
      if(cmd.length === 0) return;
      let command = client.commands.get(cmd)
      if(!command) command = client.commands.get(client.aliases.get(cmd)) 
    
  try {
      command.run(client, message, args)
  } catch (err) { 
 
     console.error('Erro:' + err); 
  }
});

client.on("message", message => {
    if (message.author.bot) return;
    if (message.channel.type == 'kazinho')
    return
    if(message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`) {
    return message.channel.send(`🔮 | Olá ${message.author}, veja meus comandos com **${config.prefix}help**!`)
    }
    }); 

client.on('ready', () => {
    let activities = [
        `Atualmente em: ${client.guilds.cache.size} Servidores.`,
        `Digite ${config.prefix}help para saber dos meus comandos!`
      ],
      i = 0;
    setInterval(
      () =>
        client.user.setActivity(`${activities[i++ % activities.length]}`, {
          type: 'LISTENING' //WATCHING, PLAYING, STREAMING , LISTENING
        }),
      15000
    );
    console.log('Estou Online!');
  });

client.login(config.token || process.env.token); //no config.json ou no Secret(env) o Bot vai Ligar
