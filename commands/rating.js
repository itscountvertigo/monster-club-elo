module.exports = {
    name: 'rating',
    description: 'find rating',
    execute: async function (message, args, author, client) {
        const Discord = require('discord.js')
        const mongo_funcs = require('../mongo_funcs')

        function getUserFromMention(mention, client) {
            if (!mention) return;
        
            if (mention.startsWith('<@') && mention.endsWith('>')) {
                mention = mention.slice(2, -1);
        
                if (mention.startsWith('!')) {
                    mention = mention.slice(1)
                }
                console.log(mention)
        
                return client.users.cache.get(mention);
            }
        }
        
        if (!getUserFromMention(args[0], client)) {
            target = author
            gameMode = args[0]
        } 
        else {
            target = getUserFromMention(args[0], client)
            gameMode = args[1]
        }
        
        console.log(gameMode)

        if (gameMode != 'mt' && gameMode != 'mr' && gameMode != 'mm') {
            return message.channel.send("You have to specify a gamemode! You can use 'mt', 'mr' or 'mm'. If you can't figure it out, ping @itscountvertigo")
        }

        let target_rating = await mongo_funcs.getRating(target.id, gameMode)
        let target_gp = await mongo_funcs.getGP(target.id, gameMode)

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
        .setTitle(`${target.username} has a rating of ${target_rating} in ${gameModeText}!`)
        .setDescription(`${target.username} has played ${target_gp} games in this mode!`)
        .setFooter(`If you think this is incorrect or feel like something is wrong, feel free to ping a mod!`)
        .setTimestamp()
        message.channel.send(ratingEmbed)
    }
}