const executeCommand = require('../functions/executeCommand.js')
const executeSelectMenu = require('../functions/executeSelectMenu.js')
const executeButton = require('../functions/executeButtons.js')
const { InteractionType, EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'interactionCreate',
    /**
     * 
     * @param {*} client 
     * @param {import('discord.js').ChatInputCommandInteraction} interaction
     */
    async execute(client, interaction) {
        if (interaction.type === InteractionType.ApplicationCommand) executeCommand(client, interaction)
        if (interaction.isStringSelectMenu()) executeSelectMenu(client, interaction)
        if (interaction.isButton()) executeButton(client, interaction)
        if (!interaction.isModalSubmit()) return;
        if (interaction.customId === 'createEmbed') {
            const color = interaction.options?.getString('color')
            // Verificar si los valores están presentes
            const values = interaction.fields
            const embedName = values.getTextInputValue('nameInput')
            const embedDescription = values.getTextInputValue('descriptionInput')
            const embedColor = values.getTextInputValue('colorInput')
            
            const finalColor = color || embedColor
        
            const embedFinal = new EmbedBuilder()
              .setTitle(embedName)
              .setDescription(embedDescription)
              .setColor(finalColor)
        
            // Responder con el embed final
            interaction.reply({ embeds: [embedFinal] })
      }
    }
}