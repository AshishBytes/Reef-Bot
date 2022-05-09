const config = require(`${process.cwd()}/structures/botconfig/config.json`);
const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "premium",
  aliases: ["premium-help"],
  usage: "",
  description: "",
  category: "premium",
  cooldown: 0,
  userPermissions: "",
  botPermissions: "",
  ownerOnly: false,
  toggleOff: false,
  premium: false,

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  async execute(client, message, args, ee, prefix) {
    try {
      const support_Server = process.env.SUPPORT || config.env.SUPPORT;

      message.reply({
        embeds: [
          new MessageEmbed()
            .setFooter({
              text: client.user.username,
              iconURL: client.user.displayAvatarURL(),
            })
            .setColor(ee.color)
            .setAuthor({
              name: `Premium Features!`,
              iconURL: client.user.displayAvatarURL(),
            })
            .setDescription(`<:utility_cmnds:971048437380436008> Get a Premium For ${client.user} in Your Server!
<:99:971213021605150810> Get Access to Advanced Features of ${client.user}
<:announce:971214015667793940> Join Our **[Support Server](${support_Server})** to Get Premium`),
        ],
      });
    } catch (e) {
      console.log(e);
    }
  },
};
