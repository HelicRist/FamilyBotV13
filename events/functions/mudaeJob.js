const cron = require('cron');
const IDs = require("../../data/IDs.json")

module.exports = {
    name: "dailyPick",
    description: "daily pick cron job",

    run: async (client, Guild) => {
        await mudaeRoleAdd(Guild);
        await mudaeRoleRemove(Guild);
    }
}

const mudaeRoleAdd = async(Guild) => {
    const mudaeID = IDs.mudae;
    const mudaeRoleID = IDs.mudaeRole;
    const mudaeBot = await Guild.members.fetch(mudaeID);

    const mudaeRoleAdd = new cron.CronJob('37 14 * * *', () => {
        mudaeBot.roles.add(mudaeRoleID);
    }, null, true, 'Europe/Rome');

    mudaeRoleAdd.start();
}

const mudaeRoleRemove = async(Guild) => {
    const mudaeID = IDs.mudae;
    const mudaeRoleID = IDs.mudaeRole;
    const mudaeBot = await Guild.members.fetch(mudaeID);

    const mudaeRoleAdd = new cron.CronJob('38 21 * * *', () => {
        mudaeBot.roles.remove(mudaeRoleID);
    }, null, true, 'Europe/Rome');

    mudaeRoleAdd.start();
}