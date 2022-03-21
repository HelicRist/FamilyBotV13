const config = require('../config.json');
const fs = require("fs")

module.exports = {
    name: 'messageCreate',
    description: 'messageCreate event',
    run: async (client, message) => {
        console.log(client);
        console.log("---------------------------------------------------------------");
        console.log(message);
    }
}
