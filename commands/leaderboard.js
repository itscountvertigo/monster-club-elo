module.exports = {
    name: 'leaderboard',
    execute: async function (message) {
        const Discord = require('discord.js');
        const mongo_funcs = require('../mongo_funcs')

        lb = await mongo_funcs.leaderboard()
        console.log(lb)

        const leaderboardEmbed = new Discord.MessageEmbed()
        .setColor(0xff007b)
        .addField(
            'Leaderboard',
            `1. <@${lb[0][0]}>, rated ${lb[0][1]}
            2. <@${lb[1][0]}>, rated ${lb[1][1]}
            3. <@${lb[2][0]}>, rated ${lb[2][1]}
            4. <@${lb[3][0]}>, rated ${lb[3][1]}
            5. <@${lb[4][0]}>, rated ${lb[4][1]}
            6. <@${lb[5][0]}>, rated ${lb[5][1]}
            7. <@${lb[6][0]}>, rated ${lb[6][1]}
            8. <@${lb[7][0]}>, rated ${lb[7][1]}
            9. <@${lb[8][0]}>, rated ${lb[8][1]}
            10. <@${lb[9][0]}>, rated ${lb[9][1]}`
        )
        .setFooter(`If you think this is incorrect or feel like something is wrong, feel free to ping a mod!`)
        .setTimestamp()
        message.channel.send(leaderboardEmbed)

    }
}