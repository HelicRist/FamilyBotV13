const cron = require('cron');
const getAttivita = require("../../api/getAttivita")
const { MessageEmbed } = require("discord.js")
const config = require("../../config.json")

module.exports = {
    name: "compitiDomani",
    description: "compitiDomani",

    run: async (client) => {
        const compitiJob = new cron.CronJob('00 30 15 * * *', async () => {
            let current = new Date();
            let day = current.getDate() + 1
            let month = ""
            current.getMonth() + 1 < 10 ? month = `0${current.getMonth() + 1}` : month = current.getMonth() + 1;

            let attivita = await getAttivita()

            let fields = []
            const date = current.getFullYear() + '-' + month + '-' + day;
            console.log(date);
            attivita.data.dati.forEach(oggetto => {
                if (oggetto.datGiorno == date) {
                    fields.push({
                        name: `:teacher: ${oggetto.desMittente}`,
                        value: `:notepad_spiral: ${oggetto.desAnnotazioni}`
                    })
                }
            })

            if (fields.length == 0) {
                fields.push({
                    name: "Rilassati",
                    value: "Non ci sono attività! :zzz:"
                })
            }

            const embed = new MessageEmbed()
                .setTitle(`Attività per il *${date}*`)
                .setAuthor('Family Bot', config.iconUrl, 'https://discord.gg/fhW9qQW')
                .setColor(0x00AE86)
                .addFields(fields)
                .setThumbnail(config.iconUrl)

            client.channels.cache.get(config.compitiID).send({ embeds: [embed] })
        }, null, true, 'Europe/Rome');

        compitiJob.start();
    }
}