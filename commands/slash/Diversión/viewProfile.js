const { ContextMenuCommandBuilder, EmbedBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('View Profile')
        .setType(ApplicationCommandType.User),
    async run(client, interaction, language) {
        if (interaction.guild) {

            if (interaction.targetType === 'User') {
                // Si se selecciona un usuario
                const username = interaction.target.user.username;
                await interaction.reply(`La información de ${username} es "ASDSAD"`);
            } else if (interaction.targetType === 'ApplicationCommand') {
                const servers = client.guilds.cache.size;
                const channels = client.channels.cache.size;
                const users = client.users.cache.size;
                const uptime = formatUptime(client.uptime);

                const embed = new EmbedBuilder()
                    .setTitle('Zorion')
                    .setDescription(`> Hola, soy Zorion, un bot de moderación y entretenimiento. Siempre estoy aquí para cuidar tu server. ¿Sabías que soy la adorable mascota de —͟͞͞★ Ƚ𝐮𝒌𝔢𝚂𝒌ץ𝑤ⱥʅ𝒌𝔢г ★?\n`)
                    .setThumbnail(client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 128 }))
                    .setFields(
                        {
                            name: '📅 Birthday',
                            value: '```' + '18/10/2023' + '```',
                            inline: true
                        },
                        {
                            name: '🏯 Servers',
                            value: '```' + `${servers}` + '```',
                            inline: true
                        },
                        {
                            name: '🏯 Channels',
                            value: '```' + `${channels}` + '```',
                            inline: true
                        },
                        {
                            name: '🏯 Users',
                            value: '```' + `${users}` + '```',
                            inline: true
                        },
                        {
                            name: '📶 En Linea',
                            value: '```' + `${uptime}` + '```',
                            inline: true
                        }
                    )

                await interaction.reply({ embeds: [embed] })

                function formatUptime(milliseconds) {
                    const totalSeconds = Math.floor(milliseconds / 1000);
                    const days = Math.floor(totalSeconds / 86400);
                    const hours = Math.floor((totalSeconds % 86400) / 3600);
                    const minutes = Math.floor(((totalSeconds % 86400) % 3600) / 60);
                    const seconds = ((totalSeconds % 86400) % 3600) % 60;

                    return `${days}d, ${hours}h, ${minutes}m, ${seconds}s`;
                }
            }
        }
    }
}
