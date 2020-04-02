const BaseCommand = require("../src/Structures.js").BaseCommand

module.exports = class PingCommand extends BaseCommand {
	constructor(violet, msg) {
		super(violet, {
			info: {
				name: "ping"
			},
			settings: {
				aliases: []
			}
		})
	}

	async run(violet, msg) {
		msg.channel.send("Pong!")
	}
}