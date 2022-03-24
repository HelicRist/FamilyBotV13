const cron = require('cron');
const getCompiti = require("../../api/getCompiti")
const {MessageEmbed} = require("discord.js")
const config = require("../../config.json")

module.exports = {
    name: "compitiDomani",
    description: "compitiDomani",

    run: async (client) => {
        const compitiJob = new cron.CronJob('00 30 15 * * *', async () => {
            let compiti = await getCompiti()
            let current = new Date();
            let day = current.getDate() + 1
            let month = ""
            current.getMonth() + 1 < 10 ? month = `0${current.getMonth() + 1}` : month = current.getMonth() + 1;

            let fields = []
            const date = current.getFullYear() + '-' + (month) + '-' + day;
            compiti.data.dati.forEach(compito => {
                if (compito.datCompiti == date) {
                    fields.push({
                        name: `:pencil2: ${compito.desMateria} ${compito.docente}`,
                        value: `:blue_book: ${compito.desCompiti}`
                    })
                }
            })

            if (fields.length == 0) {
                fields.push({
                    name: "Rilassati",
                    value: "Non ci sono compiti! :zzz:"
                })
            }

            const embed = new MessageEmbed()
                .setTitle(`Compiti per il *${date}*`)
                .setAuthor('Family Bot', config.iconUrl, 'https://discord.gg/fhW9qQW')
                .setColor(0x00AE86)
                .addFields(fields)
                .setThumbnail(config.iconUrl)
                .setFooter(`Friendly Bot`, config.iconUrl)
            
            client.channels.cache.get(config.compitiID).send({ embeds: [embed] })
        }, null, true, 'Europe/Rome');

        compitiJob.start();
    }
}