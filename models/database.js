// models/database.js
const mongoose = require('mongoose');

const prefixSchema = new mongoose.Schema({
  guildId: { type: String, required: true, unique: true },
  prefix: { type: String, default: '!' }, // Puedes cambiar el prefijo predeterminado aquí
});

const Prefix = mongoose.model('Prefix', prefixSchema);

async function getPrefix(guildId) {
  try {
    const result = await Prefix.findOne({ guildId });
    return result ? result.prefix : '!';
  } catch (error) {
    console.error('Error al obtener el prefijo:', error);
    return '!';
  }
}

async function setPrefix(guildId, prefix) {
  try {
    await Prefix.findOneAndUpdate({ guildId }, { prefix }, { upsert: true });
  } catch (error) {
    console.error('Error al establecer el prefijo:', error);
  }
}

module.exports = { Prefix, getPrefix, setPrefix };