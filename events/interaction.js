module.exports = {
    name: "interaction",

    run: async (client, interaction) => {
        if (!interaction.isCommand()) return;
        const command = client.slash.get(interaction.commandName);

        await command.run(
            client,
            interaction,
            interaction.options._hoistedOptions.map((item) => item.value)
        );
    }
}