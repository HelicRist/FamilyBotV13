const { Message, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require("fs");
const config = require('../../config.json');
const sendLog = require('../../functions/log/sendLog');

module.exports = {
    name: 'test',
    description: `${config.prefix}test`,

    run: async (client, interaction, args) => {
        try{
            sendLog.run(interaction, "Test command eseguito con successo", 2);
        }
        catch(err){
            sendLog.run(interaction, "Errore nell'eseguzione del comando test", 1);
        }
    }
};