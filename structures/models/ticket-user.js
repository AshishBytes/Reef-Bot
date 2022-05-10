const { Schema, model } = require("mongoose");

const Ticket = new Schema({
  guildID: String,
  userID: String,
  channelID: String,
  channelIndex: Number,
  closed: Boolean,
  locked: Boolean,
  claimed: Boolean,
  claimedBy: String,
  OpenTime: String,
});

module.exports = model("ticket-user", Ticket);

/**
 * @INFO
 * Bot Coded by - Ashish. 🖤#0257 | https://discord.gg/bothub
 * @INFO
 * Work for Bot Hub™ Development | https://discord.gg/bothub
 * @INFO
 * Please Mention Us Bot Hub™ Development, When Using This Code!
 * @INFO
 */
