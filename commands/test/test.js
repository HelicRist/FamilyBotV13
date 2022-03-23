const { Message, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require("fs");
const config = require('../../config.json');
const sendLog = require('../../functions/log/sendLog');

module.exports = {
    name: 'test',
    description: `${config.prefix}test`
};