// Require packages needed
const Discord = require("discord.js")
const Violet = require("./src/Structures.js")
const fs = require("fs")

// Variables
const violet = new Violet.Client({
	shards: "auto"
})

violet.commands = new Discord.Collection()
violet.commands.aliases = new Discord.Collection()

try {
	let categories = fs.readdirSync("./commands/")

	categories = categories.filter(f => f.split(".").pop() === f)
	if (categories.length === 0) {
	    violet.log.commands("No category folders, so no commands.\n")
	    return;
	}

	for (let n = 0; n < categories.length; n++) {
	    let commands = fs.readdirSync(`./commands/${categories[n]}`)
	    commands = commands.filter(f => f.split(".").pop() === "js")

	    if(commands.length === 0) {
	    	violet.log.commands(`No commands to load for the category ${categories[n]}`)
	    }

	    let loadednum = 0;
	    for(let i = 0; i < commands.length; i++) {
	    	const cmd = commands[i].slice(0, -3)
		    try {
		        let props = new(require(`./commands/${categories[n]}/${commands[i]}`))()
		        props.file = commands[i]
		        violet.commands.set(props.info.name, props)
		        props.settings.aliases.forEach(a => {
		            violet.commands.aliases.set(a, props.info.name)
		        })
		        violet.log.commands(`Successfully loaded command ${cmd}.`)
		        loadednum++
		    } catch (err) {
		        const trace = err.stack.toString().split("\n").slice(0, 3).join("\n")
		        violet.log.error(`An error occured while trying to load ${cmd}\n${trace}`)
		        violet.log.commands(`Could not load the command ${cmd}.`)
		    }
		}
		violet.log.commands(`Successfully loaded ${loadednum} commands for the category ${categories[n]}.\n`)
	}
	violet.commands.categories = categories;
} catch(err) {
	violet.log.error(err)
}

try {
	let files = fs.readdirSync("./events/")
    files = files.filter(f => f.split(".").pop() === "js")
    if(files.length === 0) {
        console.log("There are no events to load.\n\n")
        return;
    }

    let loadednum = 0
    for(let i = 0; i < files.length; i++) {
    	const _event = files[i].slice(0, -3)
    	try {
	        const event = require(`./events/${files[i]}`)
	        violet.on(files[i].slice(0, -3), event.bind(null, violet))
	        violet.log.events(`Successfully loaded event ${_event}.`)
	        loadednum++
	    } catch(err) {
			const trace = err.stack.toString().split("\n").slice(0, 3).join("\n")
			violet.log.error(`An error occured while trying to load ${_event}\n${trace}`)
	    	violet.log.events(`Could not load the event ${_event}.`)
	    }
    }
	violet.log.events(`Successfully loaded ${loadednum} events.\n`)
} catch(err) {
	violet.log.error(err)
}

violet.login(violet.config.token)