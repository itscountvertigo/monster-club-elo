// discord setup
const Discord = require('discord.js');
const client = new Discord.Client();

// env variables setup
require('dotenv').config();

// command file system
const fs = require('fs');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
};

const prefix = '!';

client.on("ready", () => {
    console.log('Bot is running!')
    client.user.setActivity("use !/#/- help", { type: "WATCHING"})
})

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'win') {
        client.commands.get('win').execute(message, args, message.author);
    }
    else if (command === 'lose') {
        client.commands.get('lose').execute(message, args, message.author);
    }
    else if (command === 'rating') {
        client.commands.get('rating').execute(message, args, message.author);
    }
    else if (command === 'setrating') {
        client.commands.get('setrating').execute(message, args, message.author);
    }
    else if (command === 'setgamesplayed' || command === 'setgp') {
        client.commands.get('setgamesplayed').execute(message, args, message.author);
    }
    else if (command === 'help' || command === 'commands' || command === 'about') {
        client.commands.get('help').execute(message, args, message.author);
    }
})

client.login(process.env.ELO_DC_TOKEN)