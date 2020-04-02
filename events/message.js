module.exports = (violet, msg) => {
	if(msg.content === "hi") {
		violet.commands.get("ping").run(violet, msg)
	}
}