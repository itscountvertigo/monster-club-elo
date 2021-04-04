module.exports = {
    name: 'simulate',
    description: 'for pro gamers',
    execute: async function(message, args, author, client){
        const Discord = require('discord.js');
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
        
        // find opponent
        let p1 = getUserFromMention(args[0], client)
        let p2 = getUserFromMention(args[1], client)

        
        // content checks (checks wether or not the pinged user is valid)
        if (!p1 || !p2){
            console.log(`${author.username} tried to simulate without players`)
            return message.channel.send('You need to specify 2 players!')
        }
        if (p1.id == message.client.user.id || p2.id == message.client.user.id) {
            console.log(`${author.username} tried to battle the bot`)
            return message.channel.send("I can't battle! I'm a bot!")
        }
        if (p1.id == p2.id) {
            console.log(`${author.username} tried to battle the same player twice`)
            return message.channel.send("You can't battle yourself!")   
        }

        // get info from mongo
        p1Rating = await mongo_funcs.getRating(p1.id)
        p2Rating = await mongo_funcs.getRating(p2.id)

        p1GP = await mongo_funcs.getGP(p1.id)
        p2GP = await mongo_funcs.getGP(p2.id)

        p1Kval = 32
        p2Kval = 32

        if (p1GP <= 8) {
          p1Kval = 16
        }
        if (p2GP <= 8) {
          p2Kval = 16
        } 

        p1WinProb = 1 / (1 + 10 ** ((p2Rating - p1Rating) / 400))
        p2WinProb = 1 - p1WinProb

        // if p1 wins:
        p1NewRatingWin = Math.round(p1Rating + p1Kval * (1 - p1WinProb))
        p2NewRatingLoss = Math.round(p2Rating + p2Kval * (0 - p2WinProb))

        // if p2 wins:
        p1NewRatingLoss = Math.round(p1Rating + p1Kval * (0 - p1WinProb))
        p2NewRatingWin = Math.round(p2Rating + p2Kval * (1 - p2WinProb))

        // if p1 wins:
        p1DiffWin = (p1NewRatingWin - p1Rating)
        if (p1DiffWin > 0) {
          p1DiffWin = `+${p1DiffWin}`
        }
        p2DiffLoss = (p2NewRatingLoss - p2Rating)
        if (p2DiffLoss > 0) {
          p2DiffLoss = `+${p2DiffLoss}`
        }
        
        // if p2 wins:
        p1DiffLoss = (p1NewRatingLoss - p1Rating)
        if (p1DiffLoss > 0) {
          p1DiffLoss = `+${p1DiffLoss}`
        }
        p2DiffWin = (p2NewRatingWin - p2Rating)
        if (p2DiffWin > 0) {
          p2DiffWin = `+${p2DiffWin}`
        }
        
        // create embed
        let confirmEmbed = new Discord.MessageEmbed()
        .setColor(0xff007b)
        .setTitle(`${p1.username} vs ${p2.username}`)
        .setDescription(`Simulated match, no real changes made.`)
        .addFields(
            {
                name: `If ${p1.username} won:`, 
                value: `${p1.username}: ${p1NewRatingWin} (${p1DiffWin}), previously ${p1Rating}\n
                        ${p2.username}: ${p2NewRatingLoss} (${p2DiffLoss}), previously ${p2Rating}`
            },
            {
                name: `If ${p2.username} won:`, 
                value: `${p1.username}: ${p1NewRatingLoss} (${p1DiffLoss}), previously ${p1Rating}\n
                        ${p2.username}: ${p2NewRatingWin} (${p2DiffWin}), previously ${p2Rating}`
            }
        )
        .setFooter(`If you think this is incorrect or feel like something is wrong, feel free to ping a mod!`)
        .setTimestamp()
        message.channel.send(confirmEmbed)
        console.log(`${author.username} simulated ${p1.username} vs ${p2.username}`)
    }
}
