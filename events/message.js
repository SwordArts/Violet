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
        if(violet.commands.has(command)) {
            cmd = violet.commands.get(command)
        } else if(violet.aliases.get(command)) {
            cmd = violet.commands.get(violet.aliases.get(command))
        } else {
            return;
        }
        cmd.run(violet, msg, args)
    } catch(err) {
        violet.log.error(err)
    }
}