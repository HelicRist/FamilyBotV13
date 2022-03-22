const { Message } = require("discord.js");
const fs = require("fs");
const config = require('../../config.json');


module.exports = {
    name: 'test',
    description: `Comando test.`,
    aliases: ['prova'],
    usage: `${config.prefix}test`,
    category: 'test',

    run: async (client, message, args) => {
        message.channel.send(`:white_check_mark: Comando test eseguito correttamente!`);
    }
}