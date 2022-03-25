const { Message, MessageEmbed } = require("discord.js");
const fs = require("fs");
const config = require('../../config.json');
const sendLog = require('../../functions/log/sendLog');

module.exports = {
    name: 'help',
    description: `${config.prefix}help <categeoria>`,
    options: [{
        name: "categoria",
        type: "STRING",
        description: "Categoria di cui mostrare le informazioni",
        required: "false"
    }],

    run: async (client, interaction, args) => {
        if (args[0]) {
            const category = args[0];

            if (!checkCategory(category, client)) {
                sendLog.run(interaction, `Categoria **${category}** non trovata!`, 1);
                return;
            }

            sendCategoryHelp(client, category, interaction);
        }
        else {
            sendGeneralHelp(interaction);
        }
    }
}

const checkCategory = (category, client) => {
    const categorie = client.categories.get("categorie")
    if (categorie.includes(category)) {
        return true;
    }
    else {
        return false;
    }
}

const sendCategoryHelp = (client, category, interaction) => {
    let fields = [];
    const categoryList = client.categories.get("categorie");
    const categoryObject = client.commands
    
    let commands = categoryObject.get(category);
    commands.forEach(command => {
        fields.push({
            name: command.name.toUpperCase(),
            value: `**Nome: **${command.name}\n**Uso: ** ` + '`' + `${command.description}` + '`',
        });
    });

    const embed = new MessageEmbed()
        .setTitle(`Comandi di *${category}*`)
        .setAuthor('Family Bot', config.iconUrl, 'https://discord.gg/fhW9qQW')
        .setColor(0x00AE86)
        .addFields(fields)
        .setThumbnail(config.iconUrl)
        .setFooter(`Friendly Bot`, config.iconUrl)

    interaction.reply({ embeds: [embed] });
}

const sendGeneralHelp = (interaction) => {
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

    interaction.reply({ embeds: [embed] });
}