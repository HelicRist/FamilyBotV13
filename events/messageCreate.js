const config = require('../config.json');
const fs = require("fs")

module.exports = {
    name: 'messageCreate',
    description: 'messageCreate event',
    run: async (client, message) => {
        if (message.author.bot) return;
        if (message.content.startsWith(config.prefix)) {
            const command = message.content.split(' ')[0].slice(config.prefix.length);
            const args = message.content.split(' ').slice(1);
            const commandObject = client.commands.get(command)
                || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
            if (commandObject) {
                commandObject.run(client, message, args);
            } else {
                message.reply(`:x: Comando ${command} non trovato !`);
            }
        }
    }
}
