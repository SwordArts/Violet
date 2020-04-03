const BaseCommand = require("../../src/Structures.js").BaseCommand

class HelpCommand extends BaseCommand {
	constructor(violet) {
		super(violet, {
			info: {
				name: "help",
				description: "Shows all the commands that I have."
			},
			settings: {
				aliases: ["h", "commands"],
                category: "System"
			}
		})
	}

	async run(violet, msg, args) {
        if(!args[0]) {
            let fields = []

            for (var i = 0; i < violet.commands.categories.length; i++) {
                const categories = violet.commands.categories;
                const cmds = violet.commands.filter(c => c.settings.category === categories[i])
                .map(c => `\`${c.info.name}\``)
                fields[i] = {
                    name: categories[i],
                    value: cmds.join(", ")
                }
            }
            msg.channel.send({embed: {
                color: 0x0,
                fields: fields
            }})
        } else {
            if(violet.commands.has(args[0])) {
                const cmd = violet.commands.get(args[0])
                msg.channel.send({embed: {
                    color: 0x0,
                    thumbnail: {
                        url: violet.user.displayAvatarURL({ format: "png", dynamic: true, size: 512})
                    },
                    author: {
                        name: `Details for the command ${args[0]}.`,
                        icon_url: msg.author.displayAvatarURL()
                    },
                    description: `${cmd.info.description}\nAliases: ${cmd.settings.aliases.length !== 0 ? `\`${cmd.settings.aliases.join("`, `")}\`` : "None."}`
                }})
            } else {
                msg.channel.send("Sorry, I could not find that command.")
            }
        }
	}
}

module.exports = HelpCommand;