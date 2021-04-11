module.exports = {
    name: 'init_new_ratings',
    description: 'initialize new rating types',
    execute: async function (message) {
        const Discord = require('discord.js')
        const mongo_funcs = require('../mongo_funcs')

        results = await mongo_funcs.init_new_ratings()
        return message.channel.send('check mongo to see if its done')
    }
}