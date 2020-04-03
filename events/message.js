module.exports = (violet, msg) => {
    if(msg.author.bot) return;
    if(msg.channel.type === "dm") return;

    let mssg = msg.content.toLowerCase() || msg.content.toUpperCase()
    const prefixes = [`<@!${violet.user.id}>`, `<@${violet.user.id}>`, "violet ", "v, "]
    let prefix = false
    for(let pref of prefixes) {
        if(mssg.startsWith(pref)) prefix = pref;
    }

    if(!prefix) return;

    const args = msg.content.slice(prefix.length).trim().split(" ")
    const command = args.shift().toLowerCase()
    try {
        let cmd;
        if(!violet.commands.has(command)) return;
        cmd = violet.commands.get(command) || violet.commands.get(violet.commands.aliases.get(command))

        if(cmd.settings.ownerOnly && msg.author.id !== "439373663905513473" || cmd.settings.category === "Developer" && msg.author.id !== "439373663905513473") return msg.channel.send("Sorry, but I can't allow you to do that.")
        cmd.run(violet, msg, args)
    } catch(err) {
        violet.log.error(err)
    }
}