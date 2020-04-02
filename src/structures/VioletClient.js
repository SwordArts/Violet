const Discord = require("discord.js")

class VioletClient extends Discord.Client {
	constructor(options) {
		super(options)

		this.config = require("../../config.json")
		this.log = new (require("./VioletLogger.js"))()
	}
}

module.exports = VioletClient;