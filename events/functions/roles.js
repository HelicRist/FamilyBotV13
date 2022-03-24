const config = require('../../config.json');
const cron = require('cron');
const akaneko = require('akaneko');
const { MessageEmbed } = require('discord.js');
const subjectID = config.subjectRolesID;

module.exports = {
    name: 'roles',
    description: 'get roles',
    run: async (client) => {
        const Guild = client.guilds.cache.get(config.guildID);
        let message = await client.channels.cache.get(config.messagesToCheckReactions[0].channelID).messages.fetch(config.messagesToCheckReactions[0].messageID);
        //const emojis = message.reactions.cache.map(reaction => reaction.emoji.name);
        console.log(message.content);

        const f = () => {1==1}
        const c = message.createReactionCollector({time: 1})
        
        c.on('collect', (i)=>{console.log(i);})
    }
}