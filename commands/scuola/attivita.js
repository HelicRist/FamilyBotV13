const config = require("../../config.json")
const getAttivita = require("../../api/getAttivita")
const { MessageEmbed } = require('discord.js')
const logSender = require("../../functions/log/sendLog")

module.exports = {
    name: 'attivita',
    description: `${config.prefix}attivita <giorno> <mese>. Senza argomenti mostra le attività del giorno successivo.`,
    options: [{
        name: "giorno",
        type: "NUMBER",
        description: "Giorno di cui mostrare le attivita",
        required: "false"
    },
    {
        name: "mese",
        type: "NUMBER",
        description: "Mese di cui mostrare le attivita",
        required: "false"
    }],

    run: async (client, interaction, args) => {
        const options = interaction.options._hoistedOptions;
        const current = new Date();
        let day = current.getDate() + 1;
        let month = current.getMonth() + 1;

        let mistake = false;
        options.forEach(option => {
            console.log(option);
            if (option.name == "giorno") {
                if (option.value <= 0 || option.value > 31) {
                    mistake = true;
                    return logSender.run(interaction, "Inserisci un giorno corretto!", 1)
                }
                day = option.value
            }
            else {
                if (option.name == "mese") {
                    if (option.value <= 0 || option.value > 12) {
                        mistake = true;
                        return logSender.run(interaction, "Inserisci un mese corretto!", 1)
                    }
                    month = option.value
                }
            }
        })

        let attivita = await getAttivita()

        current.getMonth() + 1 < 10 ? month = `0${month}` : month = month;

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
        if (!mistake) {
            interaction.reply({ embeds: [embed] })
        }
    }
}