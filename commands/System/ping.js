const BaseCommand = require("../../src/Structures.js").BaseCommand

module.exports = class PingCommand extends BaseCommand {
	constructor(violet) {
		super(violet, {
			info: {
				name: "ping",
				description: "See how long it takes for me to respond.",
				usage: "ping"
			},
			settings: {
				aliases: [],
				category: "System"
			}
		})
	}

	async run(violet, msg) {
		const m = await msg.channel.send("Pong...?")
		m.edit(`🏓 Pong!
	📧 Message: \`${m.createdTimestamp - msg.createdTimestamp}ms\`
	💓 Heartbeat: \`${violet.ws.ping}ms\``)
	}
}