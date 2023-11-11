// const { SlashCommandBuilder } = require('@discordjs/builders')
// const { EmbedBuilder } = require('discord.js')
// const config = require('../../../config.json')

// module.exports = {
//     cooldown: 10,
//     data: new SlashCommandBuilder()
//         .setName('ping')
//         .setDescription('Test the bots response time.'),
//     async run(client, interaction, language) {

//         const startTime = Date.now();

//         const response = await interaction.reply('Pong!🏓');

//         const endTime = Date.now();
//         const timestamp = endTime - startTime;
//         const wsPing = Math.round(client.ws.ping);

//         const pingEmbed = new EmbedBuilder()
//         .setColor(config.defaultSuccessColor)
//         .setTitle('Pong!🏓')
//         .addFields(
//             {
//                 name: '**⏳ Time:**',
//                 value: `${timestamp} ms\n`,
//                 inline: false
//             },
//             {
//                 name: '**⏱ WS:**',
//                 value: `${wsPing} ms`,
//                 inline: false
//             }
//         )
//         return interaction.editReply({ content: ' ', embeds: [pingEmbed] })
//     }
// }

const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const config = require('../../../config.json');

// Un objeto para rastrear la hora de la última ejecución de un comando por usuario
const cooldowns = new Map();

module.exports = {
    cooldown: 10,
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Test the bot\'s response time.'),
    async run(client, interaction, language) {
        const userId = interaction.user.id;

        // Comprueba si el usuario está en cooldown
        if (cooldowns.has(userId)) {
            const expirationTime = cooldowns.get(userId) + (this.cooldown * 1000);

            if (Date.now() < expirationTime) {
                const timeLeft = (expirationTime - Date.now()) / 1000;
                return interaction.reply(`Tienes que esperar ${timeLeft.toFixed(1)} segundos antes de poder usar este comando de nuevo.`);
            }
        }

        // Si el usuario no está en cooldown o ha terminado el cooldown, ejecuta el comando.
        const startTime = Date.now();

        const response = await interaction.reply('Pong!🏓');

        const endTime = Date.now();
        const timestamp = endTime - startTime;
        const wsPing = Math.round(client.ws.ping);

        const pingEmbed = new EmbedBuilder()
        .setColor(config.defaultSuccessColor)
        .setTitle('Pong!🏓')
        .addFields(
            {
                name: '**⏳ Time:**',
                value: `${timestamp} ms\n`,
                inline: false
            },
            {
                name: '**⏱ WS:**',
                value: `${wsPing} ms`,
                inline: false
            }
        );

        // Actualiza el tiempo de cooldown para el usuario
        cooldowns.set(userId, Date.now());

        // Establece un temporizador para eliminar al usuario del mapa de cooldowns después del tiempo de cooldown.
        setTimeout(() => {
            cooldowns.delete(userId);
        }, this.cooldown * 1000);

        return interaction.editReply({ content: ' ', embeds: [pingEmbed] });
    }
};
