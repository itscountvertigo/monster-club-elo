module.exports = {
    name: 'rating',
    description: 'find rating',
    execute: async function (message, args, author) {
        const Discord = require('discord.js')
        const mongo_funcs = require('../mongo_funcs')

        if (!message.mentions.users.size) {
            target = author
        } 
        else {
            target = message.mentions.users.first()
        }

        let target_rating = await mongo_funcs.getRating(target.id)
        let target_gp = await mongo_funcs.getGP(target.id)

        const ratingEmbed = new Discord.MessageEmbed()
        .setColor(0xff007b)
        .setTitle(`${target.username} has a rating of ${target_rating}!`)
        .setDescription(`${target.username} has played ${target_gp} games!`)
        .setFooter(`If you think this is incorrect or feel like something is wrong, feel free to ping a mod!`)
        .setTimestamp()
        message.channel.send(ratingEmbed)
    }
}