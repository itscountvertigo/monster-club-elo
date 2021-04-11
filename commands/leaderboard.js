module.exports = {
    name: 'leaderboard',
    execute: async function (message, args) {
        const Discord = require('discord.js');
        const mongo_funcs = require('../mongo_funcs')

        gameMode = args[0]

        if (gameMode != 'mt' && gameMode != 'mr' && gameMode != 'mm') {
            return message.channel.send("You have to specify a gamemode! You can use 'mt', 'mr' or 'mm'. If you can't figure it out, ping @itscountvertigo")
        }

        lb = await mongo_funcs.leaderboard(gameMode)
        console.log(lb)

        lbText = ''
        for (i = 0; i < lb.length; i++) {
            lbText = lbText.concat(`${i + 1}. <@${lb[i][0]}>, rated ${lb[i][1]}\n`)
        }

        if (lbText == '') {
            lbText = 'No one has played this gamemode.'
        }

        let gameModeText  
        if (gameMode == 'mt') {
          gameModeText = 'Monster Trial';
        } else if (gameMode == 'mr') {
          gameModeText = 'Monster Royale';
        } else if (gameMode == 'mm') {
          gameModeText = 'Monster Maze';
        }

        console.log(gameModeText)

        const leaderboardEmbed = new Discord.MessageEmbed()
        .setColor(0xff007b)
        .addField(`${gameModeText} leaderboard`, lbText)
        .setFooter(`If you think this is incorrect or feel like something is wrong, feel free to ping a mod!`)
        .setTimestamp()

        message.channel.send(leaderboardEmbed)
    }
}