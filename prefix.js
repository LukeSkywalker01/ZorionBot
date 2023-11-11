const { Prefixes } = require('./models/database.js');

const PREFIX = '!'; // Prefijo predeterminado

module.exports = {
  getPrefix: async (guildId) => {
    const result = await Prefixes.findOne({ guild_id: guildId });

    if (!result) {
      return PREFIX;
    } else {
      return result.prefix;
    }
  },
  setPrefix: async (guildId, newPrefix) => {
    await Prefixes.findOneAndUpdate(
      { guild_id: guildId },
      { $set: { prefix: newPrefix } },
      { upsert: true }
    );
  },
};
