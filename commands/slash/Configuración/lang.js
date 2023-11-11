const { SlashCommandBuilder } = require('discord.js');
const guildModel = require('../../../models/guild.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('language')
        .setDescription('Cambia el lenguaje del servidor.')
        .addStringOption(option =>
            option.setName('lang')
                .setDescription('Lenguaje del servidor.')
                .addChoices(
                    { name: 'Español', value: 'es' },
                    { name: 'English', value: 'en' },
                    { name: 'Português', value: 'pt' }
                )
        )
        .setDMPermission(true),
    async run(client, interaction) {
        const language = interaction.options.getString("lang")

        if (interaction.inGuild()) {
            if (!interaction.member.permissions.has('Administrator')) return interaction.reply({ content: client.languages.__({ phrase: 'lang.noAdministrator', locale: language }), ephemeral: true })
            if (!language) return interaction.reply('Supported languages are **Español, English, Portugês**')
            await guildModel.findOne({ guildId: interaction.guildId.toString() }).then((s, err) => {
                if (err) return console.log(err)
                if (s) {
                    s.lang = language
                    s.save().catch(e => console.log(e))
                } else {
                    const newGuild = new guildModel({
                        guildId: interaction.guildId.toString(),
                        lang: language
                    })
                    newGuild.save().catch(e => console.log(e))
                }
            })
            return interaction.reply({ content: client.languages.__({ phrase: 'lang.newLanguage', locale: language }), ephemeral: true })
        } else {
            return interaction.reply('Run the command on a server where the bot is located')
        }
    }
}