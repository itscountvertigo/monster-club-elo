module.exports = {
    name: 'turtles',
    description: 'i love turtles and so should you',
    execute: async function (message) {
        const Discord = require('discord.js')
        const fs = require('fs')
        
        turtlesPraise = fs.readFileSync('turtlespraise.txt').toString().split('\n');

        message.channel.send(`${turtlesPraise[Math.floor(Math.random() * turtlesPraise.length)]}`)
    }
}