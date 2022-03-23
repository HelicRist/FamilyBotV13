const { Message, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require("fs");
const config = require('../../config.json');
const sendLog = require('../../functions/log/sendLog');

module.exports = {
    name: 'help',
    description: `Comando help`,
    options: [{
        name: "categoria",
        type: "STRING",
        description: "Categoria di cui mostrare le informazioni",
        required: "false"
    }],

    run: async (client, interaction, args) => {
        console.log(args);
    }
}