// Require packages needed
const Discord = require("discord.js")
const Violet = require("./src/Structures.js")
const fs = require("fs")

// Variables
const violet = new Violet.Client()

violet.commands = new Discord.Collection()
violet.commands.aliases = new Discord.Collection()

fs.readdir("./commands/", (err, f) => {
	if(err) return console.error(`[Error] ${err.message}\n${err.stack}`)

	const files = f.filter(f => f.split(".").pop() === "js")
    if(files.length === 0) {
        violet.log.commands("There are no commands to load.\n")
        return;
    }

    let loadednum = 0
    for(let i = 0; i < files.length; i++) {
    	const cmd = files[i].slice(0, -3)
    	try {
	        let props = new (require(`./commands/${files[i]}`))()
	        props.file = files[i]
	        violet.commands.set(props.info.name, props)
	        props.settings.aliases.forEach(a => {
	            violet.commands.aliases.set(a, props.info.name)
	        })
	        violet.log.commands(`Successfully loaded command ${cmd}.`)
	        loadednum++
		} catch(err) {
			const trace = err.stack.toString().split("\n").slice(0, 3).join("\n")
			violet.log.error(`An error occured while trying to load ${cmd}\n${trace}`)
			violet.log.commands(`Could not load the command ${cmd}.`)
		}
	} 
	violet.log.commands(`Successfully loaded ${loadednum} commands.\n`)
})

fs.readdir("./events/", (err, f) => {
    if(err) return loggr.error(err)

    const files = f.filter(f => f.split(".").pop() === "js")
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
})

violet.login(violet.config.token)