const Discord = require("discord.js");

module.exports = {
  name: "help", 
  aliases: ["h", "ajuda", "A"], 

  run: async(client, message, args) => {
    let embed = new Discord.MessageEmbed()
    .setTitle(`Painel de comandos`)
    .setThumbnail(message.author.displayAvatarURL())
    .setDescription(`Veja meus comandos:
\n🎵 Comandos de Musica
⠀`)
    .setFooter(`${message.author.tag}`)
    .setColor("YELLOW")    
    message.channel.send(`${message.author}`, embed).then(msg => {
      msg.react("◀️")
      msg.react("🎵")


      let filtro0 = (r, u) => r.emoji.name === '◀️' && u.id === message.author.id;
      let filtro1 = (r, u) => r.emoji.name === '🎵' && u.id === message.author.id;
      

      let coletor0 = msg.createReactionCollector(filtro0);
      let coletor = msg.createReactionCollector(filtro1);

      coletor0.on("collect", c => { 

      let iori = new Discord.MessageEmbed()
      .setTitle(`Painel de comandos`)
      .setThumbnail(message.author.displayAvatarURL())
      .setDescription(`Veja meus comandos:
\n🎵 comandos de Musica
⠀`)
      .setFooter(`${message.author.tag}`)
      .setColor("YELLOW")   
        
     
        msg.edit(`${message.author}`, iori)
      })


      coletor.on("collect", c => { 

        let yagami = new Discord.MessageEmbed()
        .setTitle(`🎵 Comandos de Musica 🎵`)
        .setThumbnail(message.author.displayAvatarURL())
        .setFooter(`${message.author.tag}`)
        .setDescription(`
        **y!play**
        **y!skip**
        **y!lista**
        **y!letra**
        **y!np**
        **y!pause**
        **y!stop**
        **y!skipto**
        **y!aleatorio**
        **y!conectar**
        **y!sair**
        **y!loop**
        **y!remover**
        **y!resume**
        **y!volume**
        **y!ping** \n`)
        .setColor("RED")
        

        msg.edit(`${message.author}`, yagami)  
      })
    })
  }
}
