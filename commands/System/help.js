const BaseCommand = require("../../src/Structures.js").BaseCommand

class HelpCommand extends BaseCommand {
	constructor(violet) {
		super(violet, {
			info: {
				name: "help",
				description: "Shows all the commands that I have."
			},
			settings: {
				aliases: [],
                category: "System"
			}
		})
	}

	async run(violet, msg, args) {
        let pages = {}

        for (var i = 0; i < violet.commands.categories.length; i++) {
            const categories = violet.commands.categories;
            console.log(categories[i])
            const cmds = violet.commands.filter(c => c.settings.category === categories[i])
            .map(c => `${c.info.name} - ${c.info.description}`)
            pages[i] = {
                title: `Command category: ${categories[i]}`,
                description: cmds.join("\n")
            }
            console.log(Object.keys(pages).length)
        }

        let options = {
            limit: 15 * 1000,
            min: 0,
            max: Object.keys(pages).length - 1,
            page: 0
        }

		const m = await msg.channel.send({ embed: pages[options.page] });
		  
		await m.react("⏪");
		await m.react("⏩");
		await m.react("🗑");

		const filter = (reaction, user) => {
			return ['⏪', '⏩', '🗑'].includes(reaction.emoji.name) && user.id == msg.author.id;
		}

        awaitReactions(msg, m, options, filter)

        async function awaitReactions(msg, m, options, filter) {

            m.awaitReactions(filter, { max: 1, time: options.limit, errors: ['time'] }).then(async c => {
            const r = c.first();
            if (r.emoji.name === "⏪") {
                await removeReaction(m, msg, "⏪")

                if(options.page !== options.min) {
                    await m.edit({ embed: pages[options.page - 1]})
                    options.page--
                }
                awaitReactions(msg, m, options, filter)
            } else if (r.emoji.name === "⏩") {
                await removeReaction(m, msg, "⏩");

                if (options.page !== options.max) {
                    await m.edit({ embed: pages[options.page + 1] });
                    options.page++
                }
                awaitReactions(msg, m, options, filter);
            } else if (r.emoji.name === "🗑") {
                await m.delete();
                return;
            } else {
                awaitReactions(msg, m, options, filter);
            }
            }).catch(() => {})
        }

        async function removeReaction (m, msg, emoji) {
            try { 
                m.reactions.cache.find(r => r.emoji.name == emoji).users.remove(msg.author.id); 
            } catch(err) {
                console.log(err)
            }
        }
	}
}

module.exports = HelpCommand;