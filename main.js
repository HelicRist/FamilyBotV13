const { Client, Intents, Collection } = require('discord.js');
const config = require('./config.json')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();
const fs = require('fs');
const cli = require('nodemon/lib/cli');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES]
});

client.slash = new Collection();

client.categories = new Collection();
const commandFolder = fs.readdirSync("./commands")
client.categories.set("categorie", commandFolder)

client.commands = new Collection();
for(const folder of commandFolder) {
    let commandList = [];
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for(const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        commandList.push(command);
    }
    client.commands.set(folder, commandList);
}

client.events = new Collection();
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    client.events.set(event.name, event);
}

client.on('interaction', interaction => {
    client.events.get('interaction').run(client, interaction);
})

client.once('ready', () => {
    client.events.get('ready').run(client);
});

client.on('voiceStateUpdate', (oldState, newState) => {
    client.events.get('voiceStateUpdate').run(client, oldState, newState);
})

client.login(process.env.TOKEN);