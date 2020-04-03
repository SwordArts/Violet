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
		m.edit("🏓 Pong!", {embed: {
		color: 0x47aef0,
		description: `💗 Heartbeat (WS): \`${violet.ws.ping}ms\`
		📬 Message: \`${m.createdTimestamp - msg.createdTimestamp}ms\``
	}})
	}
}