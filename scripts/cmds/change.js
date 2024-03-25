const fs = require('fs').promises;
const path = require('path');

module.exports = {
    config: {
        name: "cngmodules",
        aliases: ["cmdls", "changemodules", "change"],
        version: "2.0",
        author: "RUBISH", 
        cooldowns: 0,
        role: 2,
        shortDescription: "Change module properties",
        longDescription: "Change module properties",
        category: "👑 | Robot-Owner",
        guide: "{pn} <command_file_name> <property> <new_value>"
    },

    onStart: async ({ api, event, args }) => {
        try {
            if (args.length < 3) {
                return api.sendMessage("Please enter right format  \n\n.cngmodules <command_file_name> <property> <new_value>", event.threadID);
            }

            const [commandName, property, ...newPropertyValue] = args;

            const commandPath = path.join(__dirname, '..', 'cmds', `${commandName}.js`);

            const commandContent = await fs.readFile(commandPath, 'utf-8');

            const propertyPattern = new RegExp(`${property}:\\s*([\\s\\S]*?),`, 'i');
            const updatedContent = commandContent.replace(
                propertyPattern,
                `${property}: ${newPropertyValue.join(' ')},`
            );

            await fs.writeFile(commandPath, updatedContent, 'utf-8');

            api.sendMessage(`✅ | Command "${commandName}" ${property} updated to ${newPropertyValue.join(' ')}.`, event.threadID);
        } catch (error) {
            console.error('Error updating property:', error);
            api.sendMessage("An error occurred while updating the property.", event.threadID);
        }
    }
};
