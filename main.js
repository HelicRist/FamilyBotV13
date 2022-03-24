const { Client, Intents, Collection } = require('discord.js');
const config = require('./config.json')
require('dotenv').config();
const fs = require('fs');
const getToken = require('./api/getToken');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES]
});

const commandFolders = fs.readdirSync('./commands');

client.commands = new Collection();
client.categories = new Collection();


for (const folder of commandFolders) {
    const commandFIles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    let commands = [];
    for (const file of commandFIles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
        commands.push(command);
    }
    client.categories.set(folder, commands);
}

client.events = new Collection();
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    client.events.set(event.name, event);
}

client.on('messageCreate', message => {
    client.events.get('messageCreate').run(client, message);
})

client.once('ready', () => {
    client.events.get('ready').run(client);
    getToken.run(1,2);
});

client.on('voiceStateUpdate', (oldState, newState) => {
    client.events.get('voiceStateUpdate').run(client, oldState, newState);
})

client.login(process.env.TOKEN);