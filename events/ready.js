const config = require('../config.json')
const logger = require('node-color-log');
const cron = require('cron');
const dailyPickJob = require('../cronJobs/dailyPick.js');
const mudaeRoleJob = require('../cronJobs/mudaeJob.js');

module.exports = {
    name: "ready",
    once: true,

    run: async (client) => {
        logger.success((`[${client.user.username}] is online! (prefix: ${config.prefix})`));
        const Guild = client.guilds.cache.get("945590033035984926");

        dailyPickJob.run(client);
        mudaeRoleJob.run(client, Guild);
    }
}