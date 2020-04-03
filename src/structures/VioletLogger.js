class VioletLogger {
	constructor() {}
	
	commands(msg) {
		console.log(`[Commands] ${msg}`)
	}

	events(msg) {
		console.log(`[Events] ${msg}`)
	}

	shard(id, msg) {
		console.log(`[Shard #${id}] ${msg}`)
	}

	error(msg) {
		console.error(`[Error] ${msg}`)
	}
}

module.exports = VioletLogger;