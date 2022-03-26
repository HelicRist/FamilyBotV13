const config = require("../../config.json")
const getCompiti = require("../../api/getCompiti")
const { MessageEmbed } = require('discord.js')
const logSender = require("../../functions/log/sendLog")

module.exports = {
    name: 'compiti',
    description: `${config.prefix}compiti <giorno>. Senza argomenti mostra i compiti del giorno successivo.`,
    options: [{
        name: "giorno",
        type: "NUMBER",
        description: "Giorno di cui mostrare i compiti",
        required: "false"
    },
    {
        name: "mese",
        type: "NUMBER",
        description: "Mese di cui mostrare i compiti",
        required: "false"
    }],

    run: async (client, interaction, args) => {
        const options = interaction.options._hoistedOptions;
        const current = new Date();
        let day = current.getDate() + 1;
        let month = current.getMonth() + 1;

        options.forEach(option => {
            console.log(option);
            if (option.name == "giorno") {
                if (option.value <= 0 || option.value > 31) {
                    return logSender.run(interaction, "Inserisci un giorno corretto!", 1)
                }
                day = option.value
                console.log("1");
            }
            else {
                if (option.name == "mese") {
                    if (option.value <= 0 || option.value > 12) {
                        return logSender.run(interaction, "Inserisci un mese corretto!", 1)
                    }
                    month = option.value
                    console.log("2");
                }
            }
        })

        let compiti = await getCompiti()

        current.getMonth() + 1 < 10 ? month = `0${month}` : month = month;

        let fields = []
        const date = current.getFullYear() + '-' + month + '-' + day;
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

        interaction.reply({ embeds: [embed] })
    }
}