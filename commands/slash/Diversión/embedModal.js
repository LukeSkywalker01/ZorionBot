const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('embed')
    .setDescription('Create a embed custom.')
    .addChannelOption(option =>
      option.setName('channel')
        .setDescription('The channel to format')
        .setRequired(false)
    )
    .addStringOption(option =>
      option.setName('color')
        .setDescription('Embed color in hexadecimal format or name (#a900ff or Purple')
        .setRequired(false)
    ),
  async run(client, interaction, language) {

    const modal = new ModalBuilder()
      .setCustomId('createEmbed')
      .setTitle('Creador de embed');

    // Add components to modal

    // Create the text input components
    const nameInput = new TextInputBuilder()
      .setCustomId('nameInput')
      // The label is the prompt the user sees for this input
      .setLabel("Titulo")
      // Short means only a single line of text
      .setStyle(TextInputStyle.Short)
      .setPlaceholder('The best embed')
      .setRequired(false);

    const descriptionInput = new TextInputBuilder()
      .setCustomId('descriptionInput')
      .setLabel("Descripción")
      // Paragraph means multiple lines of text.
      .setStyle(TextInputStyle.Paragraph)
      .setPlaceholder('The best embed')
      .setRequired(false);

    const colorInput = new TextInputBuilder()
      .setCustomId('colorInput')
      // The label is the prompt the user sees for this input
      .setLabel("Color")
      // Short means only a single line of text
      .setStyle(TextInputStyle.Short)
      .setPlaceholder("#a900ff or Purple")
      .setMaxLength(7)
      .setMinLength(3)
      .setRequired(true);

    colorInput.setValue('#a900ff')

    // An action row only holds one text input,
    // so you need one action row per text input.
    const firstActionRow = new ActionRowBuilder().addComponents(nameInput);
    const secondActionRow = new ActionRowBuilder().addComponents(descriptionInput);
    const threeActionRow = new ActionRowBuilder().addComponents(colorInput);

    // Add inputs to the modal
    modal.addComponents(firstActionRow, secondActionRow, threeActionRow);

    // Show the modal to the user
    await interaction.showModal(modal);
  }
}
