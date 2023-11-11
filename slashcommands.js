const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, clientId, guildId } = require('./config.json');
require('colors');

const rest = new REST({ version: '9' }).setToken(token);

createSlash();

async function createSlash() {
  try {
    const commands = [];

    // Comandos de barra diagonal
    fs.readdirSync('./commands/slash').forEach(async (category) => {
      const commandFiles = fs.readdirSync(`./commands/slash/${category}`).filter((archivo) => archivo.endsWith('.js'));
      for (const archivo of commandFiles) {
        const command = require(`./commands/slash/${category}/${archivo}`);
        commands.push(command.data.toJSON());
      }
    });

    let response;
    if (guildId) {
      response = await rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: commands }
      );
      console.log(`[✅] Se han publicado los slash commands para el serverId: ${guildId}`.blue);
    } else {
      response = await rest.put(
        Routes.applicationCommands(clientId),
        { body: commands }
      );
      console.log('[✅] Se han publicado los slash commands Globalmente.'.blue);
    }

    // Imprimir los IDs de los slash commands si la respuesta es válida
    if (response && response.length > 0 && response[0].id) {
      console.log('IDs y Nombres de los Slash Commands:');
      response.forEach(command => console.log(`${command.name}: ${command.id}`));
    } else {
      console.error('Error al obtener IDs de los Slash Commands. Respuesta completa:', response);
    }

  } catch (error) {
    console.error('Error al ejecutar la solicitud:', error);
  }
}
