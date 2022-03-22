const cron = require('cron');
const akaneko = require('akaneko');

module.exports = {
    name: "dailyPick",
    description: "daily pick cron job",

    run: async (client) => {
        const dailyPickJob = new cron.CronJob('00 45 13 * * *', () => {

            const hembed = new MessageEmbed();

            akaneko.nsfw.hentai().then((imageURL) => {

                hembed
                    .setTitle(" :lollipop:  DAILY PIC  :purple_heart: ")
                    .setColor("#FFDEDE")
                    .setImage(imageURL)
                client.channels.cache.get("821068653348913223").send(hembed)
            });
        });

        dailyPickJob.start();
    }
}