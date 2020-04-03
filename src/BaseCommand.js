class VioletBaseCommand {
	constructor(bot, opts) {
		this.info = {
			name: opts.info.name,
			description: opts.info.description,
			usage: opts.info.usage
		}
		this.settings = {
			aliases: opts.settings.aliases,
			ownerOnly: opts.settings.ownerOnly,
			hidden: opts.settings.hidden,
			category: opts.settings.category
		}
	}
}

module.exports = VioletBaseCommand;