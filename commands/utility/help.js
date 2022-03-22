const { Message, MessageEmbed } = require("discord.js");
const fs = require("fs");
const config = require('../../config.json');
const sendLog = require('../../functions/log/sendLog');

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
                sendLog.run(message, `Categoria **${category}** non trovata!`, 1);
                return;
            }

            sendCategoryHelp(client, category, message);
        }
        else {
            sendGeneralHelp(message);
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
            name: command.name.toUpperCase(),
            value: `**Descrizione: **${command.description}\n**Uso: ** `+'`'+`${command.usage}`+'`',
        });
    });
    console.log(fields);

    const embed = new MessageEmbed()
        .setTitle(`Comandi di *${category}*`)
        .setAuthor('Family Bot', config.iconUrl, 'https://discord.gg/fhW9qQW')
        .setColor(0x00AE86)
        .addFields(fields)
        .setThumbnail(config.iconUrl)
        .setFooter(`Friendly Bot`, config.iconUrl)

    message.channel.send({ embeds: [embed] });
}

const sendGeneralHelp = (message) => {
    let fields = [];
    const commandFolders = fs.readdirSync('./commands');
    for (const folder of commandFolders) {
        const commandFIles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
        let commands = '';
        for (const file of commandFIles) {
            const command = require(`../../commands/${folder}/${file}`);
            commands += `${command.name}, `
        }

        fields.push({
            name: folder.toUpperCase(),
            value: '`' + `${config.prefix}help ${folder}` + '`',
            inline: true
        });
    }

    const embed = new MessageEmbed()
        .setTitle(`Lista dei comandi del bot. Per proposte, scrivere in *[canale_inesistente]*`)
        .setAuthor('Family Bot', config.iconUrl, 'https://discord.gg/fhW9qQW')
        .setColor(0x00AE86)
        .setDescription(`Lista dei comandi del bot. Per proposte, scrivere in *[canale_inesistente]*`)
        .addFields(fields)
        .setThumbnail(config.iconUrl)
        .setFooter(`Friendly Bot`, config.iconUrl)

    message.channel.send({ embeds: [embed] });
}
