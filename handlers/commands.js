const fs = require('fs')
const categories = fs.readdirSync('./commands/slash')

module.exports = (client) => {
    categories.forEach(async (category) => {
        fs.readdir(`./commands/slash/${category}`, (err) => {
            if (err) return console.error(err)
            const commands = fs.readdirSync(`./commands/slash/${category}`).filter((archivo) => archivo.endsWith(".js"));
            for (const archivo of commands) {
                const command = require(`../commands/slash/${category}/${archivo}`)
                client.commands.set(command.data.name, command)
            }
        })
    })
}