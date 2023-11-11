const { setPrefix, getPrefix } = require('../../models/database.js')

module.exports = {
  name: "setprefix",
  description: "Change the prefix bot",

  run: async (client, message, args) => {
    // Verifica si el usuario que envió el mensaje tiene permisos de administrador
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      return message.channel.send('No tienes permisos para cambiar el prefijo.');
    }

    // Verifica si se proporcionó un nuevo prefijo como argumento
    const newPrefix = args[0];
    if (!newPrefix) {
      return message.channel.send('Por favor, proporciona un nuevo prefijo.');
    }

    const currentPrefix = await getPrefix(message.guild.id);

    // Verifica si el nuevo prefijo es el mismo que el prefijo actual
    if (newPrefix === currentPrefix) {
      return message.channel.send('Deja de hacerme perder el tiempo intentando colocar un prefijo ya existente. Intenta cambiarlo a otro 🤬');
    }

    // Cambia el prefijo en la base de datos
    try {
      await setPrefix(message.guild.id, newPrefix);
      return message.channel.send(`El prefijo ha sido cambiado a ${newPrefix}`);
    } catch (error) {
      console.error('Error al cambiar el prefijo:', error);
      return message.channel.send('Se produjo un error al intentar cambiar el prefijo.');
    }
  },
}