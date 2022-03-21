const { Client, Intents } = require('discord.js');
const config = require('./config.json')
require('dotenv').config();
const fs = require('fs');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.run(...args));
    } else {
        client.on(event.name, (...args) => event.run(...args));
    }
}

client.login(process.env.TOKEN);