const glob = require("glob"),
  path = require("path");

module.exports = async (client) => {
  const commandFiles = glob.sync("./commands/**/*.js");
  for (const file of commandFiles) {
    const command = require(path.resolve(file));

    client.slash.set(command.name, command);
    const data = {
      name: command.name,
      description: command.description || "Empty Description",
      options: command.options ? command.options : [],
    };
    
    await client.application.commands.create(data);
  }
};