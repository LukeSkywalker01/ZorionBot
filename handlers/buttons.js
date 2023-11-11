const fs = require('fs');
const buttons = fs.readdirSync('./buttons');

module.exports = (client) => {
    // Asegúrate de que client.buttons esté inicializado como un objeto antes de usar set
    if (!client.buttons) {
        client.buttons = new Map();
    }

    for (const archivo of buttons) {
        const button = require(`../buttons/${archivo}`);
        client.buttons.set(button.data.name, button);
    }
};
