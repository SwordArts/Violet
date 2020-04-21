const BaseCommand = require("../../src/Structures.js").BaseCommand

class HelpCommand extends BaseCommand {
	constructor(violet) {
		super(violet, {
			info: {
				name: "help",
				description: "Shows all the commands that I have.",
				usage: "help [command]",
                examples: ["help", "help ping"]
			},
			settings: {
				aliases: ["h", "commands"],
                category: "System"
			}
		})
	}

	async run(violet, msg, args, prefix) {
        const p = prefix.replace("<@!622495144092106766>", "@Violet#5802 ").replace("<@622495144092106766>", "@Violet#5802 ")
        if(!args[0]) {
            let fields = []
            const categories = violet.commands.categories.filter(c => c !== "Developer")
            for (var i = 0; i < categories.length; i++) {
                const cmds = violet.commands.filter(c => c.settings.category === categories[i])
                .map(c => `\`${c.info.name}\``)
                fields[i] = {
                    name: categories[i],
                    value: cmds.join(", ")
                }
            }
            msg.channel.send({embed: {
                color: 0x47aef0,
                thumbnail: {
                        url: violet.user.displayAvatarURL({ format: "png", dynamic: true, size: 512})
                    },
                author: {
                    name: `Violet's Commands`,
                    icon_url: msg.author.displayAvatarURL()
                },
                description: "Each field represents a category. If you want to find more detail about a command, use `violet help [command]` for example `violet help ping`",
                fields: fields,
                footer: {
                    	text: `Requested by ${msg.author.tag}`
                    },
                timestamp: Date.now()
            }})
        } else {
            if(violet.commands.has(args[0])) {
                const cmd = violet.commands.get(args[0])
                msg.channel.send({embed: {
                    color: 0x47aef0,
                    thumbnail: {
                        url: violet.user.displayAvatarURL({ format: "png", dynamic: true, size: 512})
                    },
                    author: {
                        name: `Details for the command ${args[0]}.`,
                        icon_url: msg.author.displayAvatarURL()
                    },
                    description: `\`${cmd.info.usage}\`\n${cmd.info.description}\nAliases: ${cmd.settings.aliases.length !== 0 ? `\`${cmd.settings.aliases.join("`, `")}\`` : "None."}\nExample(s): \`${p}${cmd.info.examples.join(`\`, \`${p}`)}\``,
                    footer: {
                    	text: `[] is optional, <> is needed. Don't include <> or []. Requested by ${msg.author.tag}`
                    },
                    timestamp: Date.now()
                }})
            } else {
                msg.channel.send("Sorry, I could not find that command.")
            }
        }
	}
}

module.exports = HelpCommand;