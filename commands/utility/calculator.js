const config = require(`${process.cwd()}/structures/botconfig/config.json`);
const { Client, Message, MessageEmbed } = require("discord.js");
const math = require("mathjs");

module.exports = {
  name: "calculator",
  aliases: ["calc", "calculate", "math"],
  usage: "",
  description: "Calculator!",
  category: "utility",
  cooldown: 0,
  userPermissions: "",
  botPermissions: "",
  ownerOnly: false,
  toggleOff: false,

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  async execute(client, message, args, ee) {
    try {
      try {
        message.channel.send({
          embeds: [
            new MessageEmbed()
              .setAuthor({
                name: "Calculator!",
                iconURL: message.author.avatarURL({
                  dynamic: true,
                }),
              })
              .addField("> **Question**", `${args.join(" ")}`)
              .addField("> **Solution**", `${math.evaluate(args.join(" "))}`)
              .setFooter({ text: ee.footertext, iconURL: ee.footericon })

              .setColor(ee.color),
          ],
        });
      } catch (err) {
        message.reply({
          embeds: [
            new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter({ text: ee.footertext, iconURL: ee.footericon })

              .setDescription(
                `${client.allEmojis.x} Your question is not vaild!`
              ),
          ],
        });
      }
    } catch (e) {
      console.log(String(e.stack).bgRed);
      const errorLogsChannel = client.channels.cache.get(
        config.botlogs.errorLogsChannel
      );
      return errorLogsChannel.send({
        embeds: [
          new MessageEmbed()
            .setColor("RED")
            .setAuthor({
              name: message.guild.name,
              iconURL: message.guild.iconURL({
                dynamic: true,
              }),
            })
            .setTitle(`${client.allEmojis.x} Got a Error:`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
            .setFooter({ text: `Having: ${message.guild.memberCount} Users` }),
        ],
      });
    }
  },
};
