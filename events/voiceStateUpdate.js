const { Permissions, Guild } = require('discord.js');
const logger = require('node-color-log');
const config = require('../config.json');
const subjects = require('../data/subjectIDs.json');
const randomWords = require("random-words");

module.exports = {
    name: "voiceStateUpdate",
    on: true,

    run: async (client, oldState, newState) => {
        const Guild = client.guilds.cache.get(config.guildID);

        let isSubject = false;
        let subjectName = "";
        subjects.forEach(subject => {
            if (newState.member.roles.cache.has(subject.id)) {
                isSubject = true;
                subjectName = subject.nome;
            }
        });

        if (newState.channelId == config.createChannelID) {
            if (isSubject) {
                createSubjectVoice(Guild, newState.member, subjectName);
            }
            else {
                console.log(1);
                createGeneralVoice(Guild, newState.member);
            }
        }
        else {
            if (oldState.channel && oldState.channel.name.endsWith('-t')) {
                oldState.channel.delete();
            }
        }
    }
}

const createGeneralVoice = (Guild, member) => {
    const permissions = [
        {
            id: Guild.roles.everyone,
            allow: [Permissions.FLAGS.VIEW_CHANNEL],
            deny: [Permissions.FLAGS.CONNECT],
        },
        {
            id: config.pancakeRoleID,
            allow: [Permissions.FLAGS.VIEW_CHANNEL],
            allow: [Permissions.FLAGS.CONNECT],
        },

    ]

    let channels = Guild.channels;
    channels
        .create(generateRandomName(), {
            type: 'GUILD_VOICE',
            parent: config.tempChannelsCategoryID,
            permissionOverwrites: permissions,
        })
        .then(channel => {
            member.voice.setChannel(channel);
        })
        .catch(err => { logger.error(err) });
}

const createSubjectVoice = (Guild, member, subjectName) => {
    const permissions = [
        {
            id: Guild.roles.everyone,
            allow: [Permissions.FLAGS.VIEW_CHANNEL],
            deny: [Permissions.FLAGS.CONNECT],
        },
        {
            id: config.pancakeRoleID,
            allow: [Permissions.FLAGS.VIEW_CHANNEL],
            allow: [Permissions.FLAGS.CONNECT],
        },
    ]

    let channels = Guild.channels;
    channels
        .create(generateSubjectName(subjectName), {
            type: 'GUILD_VOICE',
            parent: config.libraryCategoryID,
            permissionOverwrites: permissions,
        })
        .then(channel => {
            member.voice.setChannel(channel);
        })
        .catch(err => { logger.error(err) });
}

const generateSubjectName = (subject) => {
    let name = "";
    
    const books = ['📕', '📓', '📔', '📘', '📙', '📒', '📗']

    let book = books[Math.floor(Math.random() * books.length)];
    name += book
    name += ` Stanza di ${subject} `
    name += book
    name += "-t"

    return name;
}

const generateRandomName = () => {
    let name = "";

    const emojis = [
        '😄', '😃', '😀', '😊', '☺', '😉', '😍', '😘', '😚', '😗', '😙', '😜', '😝', '😛', '😳', '😁', '😔', '😌',
        '😒', '😞', '😣', '😢', '😂', '😭', '😪', '😥', '😰', '😅', '😓', '😩', '😫', '😨', '😱', '😠', '😡', '😤',
        '😖', '😆', '😋', '😷', '😎', '😴', '😵', '😲', '😟', '😦', '😧', '😈', '👿', '😮', '😬', '😐', '😕', '😯',
        '😶', '😇', '😏', '😑'
    ]

    name += emojis[Math.floor(Math.random() * emojis.length)];
    name += randomWords(3).join(' ');
    name += emojis[Math.floor(Math.random() * emojis.length)];
    name += "-t"

    return name;
}