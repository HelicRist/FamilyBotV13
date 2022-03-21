const { Message } = require("discord.js");
const fs = require("fs");
const config = require('../../config.json');


module.exports = {
    name: 'help',
    description: `Comando help.`,
    aliases: ['command', 'commands', 'aiuto'],
    usage: `${config.prefix}help <nome_comando>`,
    category: 'utility',

    run: async (client, message, args) => {
        if (!args[0]) {
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



            let helpEmbed = {
                title: 'Help',
                author: { name: 'Friendly Bot', icon_url: config.iconUrl, url: config.iconUrl },
                description: 'Lista dei comandi del bot. Per proposte, scrivere in <#867506577719296010>',
                color: '18f0af',
                fields: fields,
                thumbnail: { url: config.iconUrl },
            };

            message.channel.send({ embed: helpEmbed });
        }
        else {
            let commandFolderName = args[0];
            const commandFolders = fs.readdirSync('./commands');
            if (!commandFolders.includes(commandFolderName)) {
                return message.channel.send({
                    embed: {
                        description: `:x: Comando inesistente!`,
                        color: '#ff0000',
                    }
                })
            }


            let checkSubs = source => fs.readdirSync(source, { withFileTypes: true })
                .filter(dir => dir.isDirectory())
                .map(dir => dir.name)

            let folderCommands = [];
            if (checkSubs(`./commands/${commandFolderName}`).length > 0) {
                console.log(`${commandFolderName} ha sottocartelle`);
                let subFolder = checkSubs(`./commands/${commandFolderName}`)[0];
                let mainFile = fs.readdirSync(`./commands/${commandFolderName}`).filter(file => file.endsWith('.js'));
                let subFiles = (fs.readdirSync(`./commands/${commandFolderName}/${subFolder}`).filter(file => file.endsWith('.js')));

                const mainCommand = require(`../../commands/${commandFolderName}/${mainFile[0]}`);
                folderCommands.push(
                    {
                        name: mainCommand.name,
                        value: mainCommand.description + '\n' + '`' + mainCommand.usage + '`',
                    }
                );

                for (const file of subFiles) {
                    const command = require(`../../commands/${commandFolderName}/${subFolder}/${file}`);
                    folderCommands.push(
                        {
                            name: command.name,
                            value: command.description + '\n' + '`' + command.usage + '`',
                        }
                    );
                }
            }
            else {
                console.log(`${commandFolderName} non ha sottocartelle`);
                const commandFiles = fs.readdirSync(`./commands/${commandFolderName}`).filter(file => file.endsWith('.js'));
                for (const file of commandFiles) {
                    const command = require(`../../commands/${commandFolderName}/${file}`);
                    folderCommands.push(
                        {
                            name: command.name,
                            value: command.description + '\n' + '`' + command.usage + '`',
                        }
                    );
                }
            }

            let helpEmbed = {
                title: `Comandi di ${commandFolderName}`,
                author: { name: 'Friendly Bot', icon_url: config.iconUrl, url: config.iconUrl },
                color: `18f0af`,
                fields: folderCommands,
                thumbnail: { url: config.iconUrl },
            }

            message.channel.send({ embed: helpEmbed });
        }
    }
}
