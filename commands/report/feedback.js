const config = require(`${process.cwd()}/structures/botconfig/config.json`);
const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "feedback",
  aliases: [],
  usage: "",
  description: "feedback command",
  category: "report",
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
      const msg = args.join(" ");
      if (!msg)
        return message.reply({
          embeds: [
            new MessageEmbed()
              .setColor(ee.mediancolor)
              .setFooter({ text: ee.footertext, iconURL: ee.footericon })

              .setDescription(`Please mention the feedback!`),
          ],
        });

      message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(ee.color)
            .setFooter({ text: ee.footertext, iconURL: ee.footericon })

            .setDescription(
              `✉ | ${message.author.username}, Thanks for the feedback!`
            ),
        ],
      });

      const feedbackChannel = client.channels.cache.get(
        config.botlogs.feedbackChannel
      );
      if (!feedbackChannel) return;

      feedbackChannel.send({
        embeds: [
          new MessageEmbed()
            .setColor(ee.color)
            .setTitle(`__New Fedback:__`)
            .setDescription(
              `**Author:**\n> ${message.author.username} | (${message.author.id})\n**Feedback:**\n> ${msg}`
            )
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setFooter({
              text: `Feedback From: ${message.guild.name} | (${message.guild.id})`,
              iconURL: message.guild.iconURL({
                dynamic: true,
              }),
            }),
        ],
      });
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
