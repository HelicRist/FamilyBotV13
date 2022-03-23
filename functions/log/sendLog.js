const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');

/**
 * TYPES
 * 0: info
 * 1: error
 * 2: success
 * 3: warn
 */

module.exports = {
    run: async (interaction, content, type) => {
        let color = null;
        let title = null;
        let description = content;

        switch (type) {
            case 0:
                color = 0x00AE86;
                title = "Info";
                break;
            case 1:
                color = 0xFF0000;
                title = "Errore";
                break;
            case 2:
                color = 0x00AE86;
                title = "Successo";
                break;
            case 3:
                color = 0xFFD700;
                title = "Avviso";
                break;
            default:
                break;
        }

        let embed = new MessageEmbed()
            .setAuthor(`${title}`, config.iconUrl, 'https://discord.gg/fhW9qQW')
            .setColor(color)
            .setDescription(description);

        interaction.reply({ embeds: [embed] });
    }
}