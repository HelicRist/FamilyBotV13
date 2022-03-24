const config = require("../../config.json")
const getCompiti = require("../../api/getCompiti")
const { MessageEmbed } = require('discord.js')
const logSender = require("../../functions/log/sendLog")

module.exports = {
    name: 'compiti',
    description: `${config.prefix}compiti <giorno>`,
    options: [{
        name: "giorno",
        type: "NUMBER",
        description: "Giorno di cui mostrare i compiti",
        required: "false"
    }],

    run: async (client, interaction, args) => {
        if(args[0] <= 0 || args >31){
            return logSender.run(interaction, "Inserisci valori reali!", 1)
        }

        let compiti = await getCompiti()
        let current = new Date();
        let day = ""
        if(args[0]){
            day = args[0]
        }
        else{
            day = current.getDate()+1
        }
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

        if(fields.length == 0){
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

        interaction.reply({embeds: [embed]})
    }
}