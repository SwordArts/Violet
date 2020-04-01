const Discord = require("discord.js")
const Violet = require("./src/structures/Structures.js")
const violet = new Violet.Client()

violet.on("ready", () => {
	console.log("Violet Evergarden at your service.")
})

violet.login(violet.config.token)