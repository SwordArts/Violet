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
		const m = await msg.channel.send("Pong...?")
		m.edit(`🏓 Pong!
	📧 Message: \`${m.createdTimestamp - msg.createdTimestamp}ms\`
	💓 Heartbeat: \`${violet.ws.ping}ms\``)
	}
}