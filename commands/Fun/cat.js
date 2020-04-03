const BaseCommand = require("../../src/Structures.js").BaseCommand

class CatCommand extends BaseCommand {
	constructor(violet) {
		super(violet, {
			info: {
				name: "cat",
				description: "Get a random image of a cut cat."
			},
			settings: {
				aliases: [],
				category: "Fun"
			}
		})
	}

	async run(violet, msg) {
		const fetch = require("node-fetch")

	    const res = await fetch("http://aws.random.cat/meow")
	    const json = await res.json()
	    msg.channel.send({embed: {
	        color: 0xFF5733,
	        description: "Aww it's a cute lil cat!",
	        image: {
	            url: json.file
	        }
	    }})
	}
}

module.exports = CatCommand;