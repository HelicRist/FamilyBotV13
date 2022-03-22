const config = require('../config.json')
const logger = require('node-color-log');
const dailyPickJob = require('../cronJobs/dailyPick.js');
const mudaeRoleJob = require('../cronJobs/mudaeJob.js');

module.exports = {
    name: "ready",
    once: true,

    run: async (client) => {
        logger.success((`[${client.user.username}] is online! (prefix: ${config.prefix})`));
        const Guild = client.guilds.cache.get("655724536792219671");

        dailyPickJob.run(client);
        mudaeRoleJob.run(client, Guild);
    }
}