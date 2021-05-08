module.exports = {
  name: 'lose',
  description: 'for losers',
  execute(message, args, author, client){
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

    p1 = author
    p2 = getUserFromMention(args[0], client)
    gameMode = args[1].toLowerCase()

    // content checks (checks wether or not the pinged user is valid)
    if (!message.mentions.users.size){
        console.log(`${author.username} called win w/o opponent`)
        return message.channel.send('You need to specify your opponent!')
    }
    if (p1.id == p2.id) {
        console.log(`${p1.username} tried to battle themselve`)
        return message.channel.send("You can't battle yourself!")   
    }
    if (p2.id == message.client.user.id) {
        console.log(`${author.username} tried to battle the bot`)
        return message.channel.send("You can't battle me! I'm a bot!")
    }
    if (gameMode != 'mt' && gameMode != 'mr' && gameMode != 'mm') {
        console.log(`${author.username} tried to without gamemode`)
        return message.channel.send("You have to specify a gamemode! You can use 'mt', 'mr' or 'mm'. If you can't figure it out, ping @itscountvertigo")
    }

      // create filter and awaitMessages
    let filter = m => m.author.id === p2.id
    message.channel.send(`${p2}, did you win? Type 'yes' or 'no' in chat.`).then(() => {
    message.channel.awaitMessages(filter, {
      max: 1,
      time: 60000,
      errors: ['time']
    })
    .then(async message => {
      message = message.first()
      
      // if game is confirmed:
      if (message.content.toLowerCase() == 'yes' || message.content.toLowerCase() == 'y') {

        // get info from mongo
        p1Rating = await mongo_funcs.getRating(p1.id, gameMode)
        p2Rating = await mongo_funcs.getRating(p2.id, gameMode)

        p1GP = await mongo_funcs.getGP(p1.id, gameMode)
        p2GP = await mongo_funcs.getGP(p2.id, gameMode)
        
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

        p1NewRating = Math.round(p1Rating + p1Kval * (0 - p1WinProb))
        p2NewRating = Math.round(p2Rating + p2Kval * (1 - p2WinProb))

        p1Diff = (p1NewRating - p1Rating)
        if (p1Diff > 0) {
          p1Diff = `+${p1Diff}`
        }

        p2Diff = (p2NewRating - p2Rating)
        if (p2Diff > 0) {
          p2Diff = `+${p2Diff}`
        }

        await mongo_funcs.setRating(p1.id, p1NewRating, gameMode)
        await mongo_funcs.setRating(p2.id, p2NewRating, gameMode)

        p1NewGP = p1GP + 1
        p2NewGP = p2GP + 1

        await mongo_funcs.setGP(p1.id, p1NewGP, gameMode)
        await mongo_funcs.setGP(p2.id, p2NewGP, gameMode)
        
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

        // create embed
        let confirmEmbed = new Discord.MessageEmbed()
        .setColor(0xff007b)
        .setTitle(`${p1.username} vs ${p2.username}: ${gameModeText}`)
        .setDescription(`${p2.username} won!`)
        .addFields(
          {name: `${p1.username}'s elo:`, value: `${p1NewRating} (${p1Diff}), previously ${p1Rating}`, inline: true},
          {name: `${p2.username}'s new elo:`, value: `${p2NewRating} (${p2Diff}), previously ${p2Rating}`, inline: true}
        )
        .setFooter(`If you think this is incorrect or feel like something is wrong, feel free to ping a mod!`)
        .setTimestamp()
        message.channel.send(confirmEmbed)

        console.log(`${p1.username} claimed loss against ${p2.username}, they confirmed. Gamemode: ${gameModeText}`)
        } 
        
        // if game is declined:
        else if (message.content.toLowerCase() == 'no' || message.content.toLowerCase() == 'n') {
          message.channel.send(`Command declined, no changes made.`)
          console.log(`${p1.username} claimed win against ${p2.username}, they declined`)
        } 
        
        // if response is invalid:
        else {
          message.channel.send(`Command declined, invalid response. Type 'yes' or 'no'`)
          console.log(`${p1.username} claimed win against ${p2.username}, they sent an invalid response`)
        }
      })
      // if time runs out:
      .catch(collected => {
          message.channel.send(`Command canceled, time ran out. ${author}, try again! If it hasn't been 1 minute, an error might've occured. Ping @itscountvertigo, please. Thanks!`);
      });
  })
  }
}