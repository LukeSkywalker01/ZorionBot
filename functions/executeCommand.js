const guildModel = require('../models/guild.js');
const config = require('../config.json');

/**
 * @param {import('discord.js').Client} client
 * @param {import('discord.js').CommandInteraction} interaction
 */
module.exports = async (client, interaction) => {
  if (!interaction.isCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) return;

  if (interaction.inGuild()) {
    // Si la interacción ocurre en un servidor
    const Guild = interaction.guild;
    await guildModel.findOne({ guildId: interaction.guildId }).then((s, err) => {
      if (err) return console.log(err);
      if (s) {
        Guild.lang = s.lang;
      } else {
        const newGuild = new guildModel({
          guildId: interaction.guildId.toString(),
          lang: config.defaultLanguage,
        });
        newGuild.save().catch(e => console.log(e));
      }
    });

    try {
      const language = interaction.member.guild.lang;
      await command.run(client, interaction, language);
    } catch (e) {
      console.error(e);
      return interaction.reply({ content: 'Ha surgido un error al ejecutar el comando.' });
    }
  } else {
    // El código modificado para interacciones en DM
    const user = interaction.user;
    await guildModel.findOne({ userId: user.id }).then((s, err) => {
      if (err) return console.log(err);
      if (s) {
        user.lang = s.lang;
      } else {
        const newUser = new guildModel({
          userId: user.id,
          lang: config.defaultLanguage,
        });
        newUser.save().catch(e => console.log(e));
      }
    })

    try {
      const language = config.defaultLanguage // Puedes definir un idioma por defecto para DM aquí
      await command.run(client, interaction, language);
    } catch (e) {
      console.error(e);
      return interaction.reply({ content: 'Ha surgido un error al ejecutar el comando en DM.' });
    }
  }
};
