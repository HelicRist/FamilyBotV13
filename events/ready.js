const config = require('../config.json')
const logger = require('node-color-log');
const dailyPickJob = require('./functions/dailyPick.js');
const mudaeRoleJob = require('./functions/mudaeJob.js');
const compitiDomani = require("./functions/compitiDomani")
const loader = require("../loaders/slash")

module.exports = {
    name: "ready",
    once: true,

    run: async (client) => {
        logger.success((`[${client.user.username}] is online! (prefix: ${config.prefix})`));
        const Guild = client.guilds.cache.get("655724536792219671");

        dailyPickJob.run(client);
        mudaeRoleJob.run(client, Guild);
        compitiDomani.run(client)

        loader(client);

        //bot status
        const botStatus = [
            `${config.prefix}help`,
            `with depression`,
            `with fake happiness`
        ]

        setInterval(function () {
            let status = botStatus[Math.floor(Math.random() * botStatus.length)];
            client.user.setActivity(status, { type: "STREAMING", url: 'https://www.twitch.tv/relaxbeats' });

        }, 5000)
    }
}