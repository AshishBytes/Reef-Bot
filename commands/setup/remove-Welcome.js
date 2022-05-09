const config = require(`${process.cwd()}/structures/botconfig/config.json`);
const { Client, Message, MessageEmbed } = require("discord.js");
const Schema = require(`${process.cwd()}/structures/models/welcomeSchema`);

module.exports = {
  name: "remove-welcome",
  aliases: [],
  usage: "",
  description: "",
  category: "setup",
  cooldown: 0,
  userPermissions: "ADMINISTRATOR",
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
      Schema.findOneAndDelete(
        {
          Guild: message.guild.id,
        },
        async (err, data) => {
          if (!data)
            return message.reply({
              embeds: [
                new MessageEmbed()
                  .setTitle(`${client.allEmojis.x} Welcome System`)
                  .setColor(ee.wrongcolor)
                  .setFooter({ text: ee.footertext, iconURL: ee.footericon })

                  .setDescription(`No Welcome Channel`),
              ],
            });
          message.reply({
            embeds: [
              new MessageEmbed()
                .setTitle(`${client.allEmojis.y} Welcome System`)
                .setColor(ee.color)
                .setFooter({ text: ee.footertext, iconURL: ee.footericon })

                .setDescription(`**Welcome Channel** has successfully Removed`),
            ],
          });
        }
      );
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
