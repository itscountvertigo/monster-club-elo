module.exports = {
    name: 'setrating',
    description: 'change rating',
    execute: async function (message, args, author) {
        const Discord = require('discord.js')
        const mongo_funcs = require('../mongo_funcs')

        function getUserFromMention(mention, client) {
            if (!mention) return;
        
            if (mention.startsWith('<@') && mention.endsWith('>')) {
                mention = mention.slice(2, -1);
        
                if (mention.startsWith('!')) {
                    mention = mention.slice(1)
                }
        
                return client.users.cache.get(mention);
            }
        }

        if (!message.mentions.users.size) {
            target = author
            changeRating = args[0]
            gameMode = args[1]
        } 
        else {
            target = getUserFromMention(args[0], message.client)
            changeRating = args[1]
            gameMode = args[2]
        }

        if (!message.member.roles.cache.some(role => role.name === 'The Inner Circle')) {
            return message.channel.send("Sorry, you lack the permissions to manage the bot.")
        }

        await mongo_funcs.setRating(target.id, changeRating, gameMode)

        let gameModeText
        if (gameMode == 'mt') {
          gameModeText = 'Monster Trial'
        }
        else if (gameMode == 'mr') {
          gameModeText = 'Monster Royale'
        }
        else if (gameMode == 'mm') {
          gameModeText = 'Monster Maze'
        }

        const ratingEmbed = new Discord.MessageEmbed()
        .setColor(0xff007b)
        .setTitle(`${target.username}'s rating is now ${changeRating} in ${gameModeText}!`)
        .setFooter(`If you think this is incorrect or feel like something is wrong, feel free to ping a mod!`)
        .setTimestamp()
        message.channel.send(ratingEmbed)
    }
}