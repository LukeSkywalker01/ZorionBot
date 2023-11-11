const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const config = require('../../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription("Displays your avatar or someone else's avatar")
        .addUserOption(option => option.setName('user').setDescription('The user to get avatar for'))
        .setDMPermission(true),
    async run(client, interaction, language) {
        const user = interaction.options.getUser('user')

        if (interaction.inGuild()) {
            if (user) {
                const embed = new EmbedBuilder()
                    .setColor(config.defaultSuccessColor)
                    .setAuthor({ name: user.username, iconURL: user.displayAvatarURL({ dynamic: true }) })
                    .setTitle(client.languages.__mf({ phrase: 'avatar.objective', locale: language }, { username: user.username }))
                    .setURL(user.displayAvatarURL({ dynamic: true, size: 2048 }))
                    .setImage(user.displayAvatarURL({ dynamic: true, size: 2048 }))
                    .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });
                return interaction.reply({ embeds: [embed] })
            } else {
                const embed = new EmbedBuilder()
                    .setColor(config.defaultSuccessColor)
                    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                    .setTitle(client.languages.__({ phrase: 'avatar.self', locale: language }))
                    .setURL(interaction.user.displayAvatarURL({ dynamic: true, size: 2048 }))
                    .setImage(interaction.user.displayAvatarURL({ dynamic: true, size: 2048 }))
                    .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });
                return interaction.reply({ embeds: [embed] })
            }
        } else {
            if (user) {
                const embed = new EmbedBuilder()
                    .setColor(config.defaultSuccessColor)
                    .setAuthor({ name: user.username, iconURL: user.displayAvatarURL({ dynamic: true }) })
                    .setTitle(client.languages.__mf({ phrase: 'avatar.objective', locale: language }, { username: user.username }))
                    .setURL(user.displayAvatarURL({ dynamic: true, size: 2048 }))
                    .setImage(user.displayAvatarURL({ dynamic: true, size: 2048 }))
                    .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });
                return interaction.reply({ embeds: [embed] })
            } else {
                const embed = new EmbedBuilder()
                    .setColor(config.defaultSuccessColor)
                    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                    .setTitle(client.languages.__({ phrase: 'avatar.self', locale: language }))
                    .setURL(interaction.user.displayAvatarURL({ dynamic: true, size: 2048 }))
                    .setImage(interaction.user.displayAvatarURL({ dynamic: true, size: 2048 }))
                    .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });
                return interaction.reply({ embeds: [embed] })
            }
        }
    }
}