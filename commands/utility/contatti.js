const { Message, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require("fs");
const config = require('../../config.json');
const sendLog = require('../../functions/log/sendLog');

module.exports = {
    name: 'contatti',
    description: `${config.prefix}contatti <conogme_prof>`,
    options: [{
        name: "contatti",
        type: "STRING",
        description: "Contatti conosciuti dei prof",
        required: "false"
    }],

    run: async (client, interaction, args) => {
        
    }
}
