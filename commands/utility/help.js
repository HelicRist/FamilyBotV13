const { Message, MessageEmbed } = require("discord.js");
const fs = require("fs");
const config = require('../../config.json');

module.exports = {
    name: 'help',
    description: `Comando help.`,
    aliases: ['command', 'commands', 'aiuto'],
    usage: `${config.prefix}help <nome_comando>`,
    category: 'utility',

    run: async (client, message, args) => {
        if (args[0]) {
            const category = args[0];

            if (!checkCategory(category, client)) {
                message.channel.send(`:x: Categoria ${category} non trovata!`);
                return;
            }

            sendCategoryHelp(client, category, message);
        }
    }
}

const checkCategory = (category, client) => {
    if (client.categories.get(category)) {
        return true;
    }
    else {
        return false;
    }
}

const sendCategoryHelp = (client, category, message) => {
    let fields = [];
    const categoryObject = client.categories.get(category);
    categoryObject.forEach(command => {
        fields.push({
            name: command.name,
            value: command.usage,
        });
    });
    console.log(fields);

    const embed = new MessageEmbed()
        .setTitle(`Comandi in ${category}`)
        .setAuthor( 'Friendly Bot')
        .setColor(0x00AE86)
        .setDescription(`Lista dei comandi del bot. Per proposte, scrivere in *[canale_inesistente]*`)
        .addFields(fields)
        .setThumbnail(config.iconUrl)
        .setFooter(`Friendly Bot`, config.iconUrl)

    message.channel.send({embeds: [embed]});
}

const sendMessageHelp = (command, message) => {}
