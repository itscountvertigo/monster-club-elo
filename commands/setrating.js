module.exports = {
    name: 'setrating',
    description: 'change rating',
    execute: async function (message, args, author) {
        const Discord = require('discord.js')
        const mongo_funcs = require('../mongo_funcs')

        if (!message.mentions.users.size) {
            target = author
            changeRating = args[0]
        } 
        else {
            target = message.mentions.users.first()
            changeRating = args[1]
        }

        if (!message.member.roles.cache.some(role => role.name === 'Elo Bot Manager')) {
            return message.channel.send("Sorry, you lack the permissions to manage the bot.")
        }

        await mongo_funcs.setRating(target.id, changeRating)

        const ratingEmbed = new Discord.MessageEmbed()
        .setColor(0xff007b)
        .setTitle(`${target.username}'s rating is now ${changeRating}!`)
        .setFooter(`If you think this is incorrect or feel like something is wrong, feel free to ping a mod!`)
        .setTimestamp()
        message.channel.send(ratingEmbed)
    }
}