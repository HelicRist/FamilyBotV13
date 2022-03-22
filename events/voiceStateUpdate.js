const {Permissions} = require('discord.js');
const logger = require('node-color-log');
const config = require('../config.json');
const subjects = require('./subjectIDs.json');

module.exports = {
    name: "voiceStateUpdate",
    on: true,

    run: async (client, oldState, newState) => {
        logger.log('voiceStateUpdate');
        const Guild = client.guilds.cache.get(config.guildID);

        const generalPerms = [
            {
                id: Guild.roles.everyone,
                deny: [Permissions.ALL],
            },
            {
                id: config.pancakeRoleID,
                allow: [Permissions.FLAGS.SPEAK, Permissions.FLAGS.CONNECT],
            }
        ]

        let isSubject = false;
        subjects.forEach(subject => {
            if(newState.member.roles.cache.has(subject.id)) {
                isSubject = true;
            }
        });

        if(isSubject){
            createSubjectlVoice();
        }
        else{
            createGeneralVoice();
        }
    }
}

const createGeneralVoice = () => {
    logger.log('general voice');
}

const createSubjectlVoice = () => {
    logger.log('subject voice');
}