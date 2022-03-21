const config = require('../config.json')
const logger = require('node-color-log');
const cron = require('cron');
const dailyPickJob = require('../cronJobs/dailyPick.js');
const mudaeRoleJob = require('../cronJobs/mudaeJob.js');

module.exports = {
    name: "ready",
    once: true,

    run: async (client) => {
        logger.success((`[${client.user.username}] is online!`));
        const Guild = client.guilds.cache.get("666312151354572801");

        dailyPickJob.run(client);
        mudaeRoleJob.run(client, Guild);
    }
}