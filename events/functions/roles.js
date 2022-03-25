const config = require('../../config.json');
const cron = require('cron');
const akaneko = require('akaneko');
const { MessageEmbed } = require('discord.js');
const subjects = require('../subjectIDs.json');

module.exports = {
    name: 'roles',
    description: 'get roles',
    run: async (client) => {
        const Guild = client.guilds.cache.get(config.guildID);
        let message = await client.channels.cache.get(config.messagesToCheckReactions[0].channelID).messages.fetch(config.messagesToCheckReactions[0].messageID);
        const emojis = message.reactions.cache.map(reaction => reaction.emoji.name);

        const filter = (reaction, user) => {
            return emojis.includes(reaction.emoji.name);
        };
        const collector = message.createReactionCollector({ filter, max: 60, errors: ['time'] })

        collector.on('collect', async (reaction, user) => {
            subjects.forEach(subject => {
                if (reaction.emoji.name == subject.emoji) {
                    const member = Guild.members.cache.get(user.id);
                    console.log(Guild.members.cache);
                    console.log(user);
                    member.roles.add(subject.id);
                }
            });
        })
    }
}