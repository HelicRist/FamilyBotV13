const config = require('../../config.json');
const cron = require('cron');
const akaneko = require('akaneko');
const { MessageEmbed } = require('discord.js');
const subjects = require('../../data/subjectIDs.json');

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
            const member = await Guild.members.fetch(user.id);
            await reaction.users.remove(user);
            subjects.forEach(async subject => {
                if (member.roles.cache.has(subject.id)) {
                    await member.roles.remove(subject.id)
                }
                if (reaction.emoji.name == subject.emoji) {
                    const role = await Guild.roles.fetch(subject.id);
                    await member.roles.add(role);
                }
            });
        })
    }
}