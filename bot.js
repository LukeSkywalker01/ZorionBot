const { Client, IntentsBitField, Collection, ActivityType, EmbedBuilder } = require('discord.js')
require('dotenv').config()
const fs = require('fs')
const config = require('./config.json')
const { join } = require('path')
const { setInterval } = require('timers')

const client = new Client({
  intents: [
    IntentsBitField.Flags.AutoModerationConfiguration,
    IntentsBitField.Flags.AutoModerationExecution,
    IntentsBitField.Flags.DirectMessageReactions,
    IntentsBitField.Flags.DirectMessageTyping,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.GuildEmojisAndStickers,
    IntentsBitField.Flags.GuildIntegrations,
    IntentsBitField.Flags.GuildInvites,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildMessageTyping,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildModeration,
    IntentsBitField.Flags.GuildPresences,
    IntentsBitField.Flags.GuildScheduledEvents,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.GuildWebhooks,
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.MessageContent
  ]
})

client.commands = new Collection()
client.contextmenus = new Collection()
client.selectMenus = new Collection()
client.buttons = new Collection()
client.languages = require('i18n')

client.languages.configure({
  locales: ['en', 'es', 'pt'],
  directory: join(__dirname, "locales"),
  defaultLocale: config.defaultLanguage,
  retryInDefaultLocale: true,
  objectNotation: true,
  register: global,

  logWarnFn: function (msg) {
    console.log('WARN' + msg)
  },

  logErrorFn: function (msg) {
    console.log('ERROR' + msg)
  },

  missingKeyFn: function (locale, value) {
    return value
  },

  mustacheConfig: {
    tags: ["{{", "}}"],
    disable: false
  }
})

setInterval(() => {
  updateStatus()
}, 15000)

async function updateStatus() {
  const promises = [
    client.shard.fetchClientValues('guilds.cache.size'),
    client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0))
  ]
  Promise.all(promises).then(results => {
    const guildNum = results[0].reduce((acc, guildCount) => acc + guildCount, 0)
    const memberNum = results[1].reduce((acc, memberCount) => acc + memberCount, 0)
    client.user.setActivity(`${guildNum} Servers and ${memberNum} Members`, { type: ActivityType.Listening })
  }).catch(console.error)
}

require("./handlers/events.js")(client);
require("./handlers/commands.js")(client);
require("./handlers/selectmenus.js")(client);
require('./handlers/buttons.js')(client);

client.login(process.env.token);


const mongoose = require('mongoose');
const { getPrefix } = require('./models/database.js');

client.prefixcommands = new Collection()

const archivos = fs.readdirSync("./commands/prefix/").filter((f) => f.endsWith(".js"))

for (arx of archivos) {
  const comando = require("./commands/prefix/" + arx)
  client.prefixcommands.set(comando.name, comando)
  console.log(`El commando ${arx} a sido cargado correctamente`)
}

const PREFIX = "!"

client.on("messageCreate", async message => {
  const serverPrefix = await getPrefix(message.guild.id);

  if (message.content.startsWith(serverPrefix)) {
    const args = message.content.slice(serverPrefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase()

    const cmd = client.prefixcommands.get(command)

    if (cmd) {
      cmd.run(client, message, args)
    }
  }
})