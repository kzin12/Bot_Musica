const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "remover", 
  aliases: ["remove"], 

  run: async(client, message, args) => {

  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      "Você deve entrar em um canal de voz antes de usar este comando!"
    );
  if (!args[0])
    return message.channel.send(
      new MessageEmbed()
        .setDescription(":x: Nenhum número de música fornecido")
        .setColor("RED")
    );
  if (isNaN(args[0]))
    return message.channel.send(
      new MessageEmbed()
        .setDescription(":x: **Args deve ser número [Exemplo: -remover 2]**")
        .setColor("RED")
    );
  let queue = message.client.queue.get(message.guild.id);
  if (args[0] == 1)
    return message.channel.send(
      new MessageEmbed()
        .setDescription(
          ":x: **Não é possível remover a música que está tocando, use o comando y!skip**"
        )
        .setColor("RED")
    );
  if (queue.queue.length == 1)
    return message.channel.send(
      new MessageEmbed()
        .setDescription(
          ":x: **Não é possível remover quando apenas uma música está tocando, use o comando prefixo stop**"
        )
        .setColor("RED")
    );
  if (args[0] > queue.queue.length)
    return message.channel.send(
      new MessageEmbed()
        .setDescription(":x: **A fila não tem tantas músicas**")
        .setColor("RED")
    );
  if (!queue)
    return message.channel.send(
      new MessageEmbed()
        .setDescription(":x: **Não há músicas tocando neste servidor**")
        .setColor("RED")
    );
  var name = queue.queue[args[0] - 1].name;
  queue.queue.splice(args[0] - 1);
  return message.channel.send(
    new MessageEmbed()
      .setDescription(
        "**Removido" + " " + name + " " + "da fila :white_check_mark: **"
      )
      .setTimestamp()
      .setColor("BLUE")
  );
}
}
