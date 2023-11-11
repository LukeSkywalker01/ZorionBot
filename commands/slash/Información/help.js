const { SlashCommandBuilder } = require('@discordjs/builders')
const { EmbedBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
  .setName('help')
  .setDescription('Información sobre los comandos del bot.'),
  async run(client, interaction) {
    return interaction.reply({ content: 'Comandos disponibles: \n\n/help - Muestra los comandos\n/avatar - Muestra el avatar tuyo u otro usuario\n/ping - Muestra la latencia del bot ', ephemeral: true })
  }
}