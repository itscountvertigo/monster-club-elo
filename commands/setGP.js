module.exports = {
    name: 'setgamesplayed',
    description: 'change games played',
    execute: async function (message, args, author) {
        const Discord = require('discord.js')
        const mongo_funcs = require('../mongo_funcs')

        if (!message.mentions.users.size) {
            target = author
            changeGP = args[0]
        } 
        else {
            target = message.mentions.users.first()
            changeGP = args[1]
        }

        if (!message.member.roles.cache.some(role => role.name === 'The Inner Circle')) {
            return message.channel.send("Sorry, you lack the permissions to manage the bot.")
        }

        await mongo_funcs.setGP(target.id, changeGP)

        const ratingEmbed = new Discord.MessageEmbed()
        .setColor(0xff007b)
        .setTitle(`${target.username} has played ${changeGP} games!`)
        .setFooter(`If you think this is incorrect or feel like something is wrong, feel free to ping a mod!`)
        .setTimestamp()
        message.channel.send(ratingEmbed)
    }
}