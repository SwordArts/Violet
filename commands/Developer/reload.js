const { BaseCommand } = require("../../src/Structures.js")

class ReloadCommand extends BaseCommand {
	constructor(violet) {
		super(violet, {
			info: {
				name: "reload",
				description: "Reloads a command.",
				usage: "reload <command>"
			},
			settings: {
				aliases: ["rl"],
				category: "Developer"
			}
		})
	}

	async run(violet, msg, args) {
		if(!args[0]) return msg.channel.send("You have to say what command to reload!")
		if(!violet.commands.get(args[0])) return msg.channel.send("Sorry, I could not find that command.")

		const category = violet.commands.get(args[0]).settings.category

		delete require.cache[require.resolve(`../${category}/${args[0]}.js`)];
        violet.commands.delete(args[0]);
        const props = new (require(`../${category}/${args[0]}.js`))()
        violet.commands.set(args[0], props);
        msg.channel.send(`The command ${args[0]} has been reloaded successfully.`);
	}
}

module.exports = ReloadCommand;