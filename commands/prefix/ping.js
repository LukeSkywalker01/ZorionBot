const { EmbedBuilder } = require('discord.js')
const config = require('../../config.json')

module.exports = {
    name: "ping",
    description: "Display the latency bot",
    
    run: async(client, message, args) => {
        
        const startTime = Date.now();

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
        )
        message.channel.send({ embeds: [pingEmbed] })
    }
}