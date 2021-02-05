const mongo = require('./mongo')
const playerSchema = require('./schemas/player-schema')

module.exports.getRating = async playerID => {
    return await mongo().then(async mongoose => {
        try {
          console.log('getRating connects to mongo!')

          const result = await playerSchema.findOne({playerID})
          console.log(`Result: ${result.rating}`)

          let rating = 1000
          let gamesPlayed = 0

          if (result) {
              rating = result.rating
              gamesPlayed = result.gamesPlayed
          } else {
              console.log('new player! adding to database')
              await new playerSchema({
                    playerID,
                    rating,
                    gamesPlayed
                }, {
                    versionKey: false
                }
              ).save()
          }
          return rating

        } finally {
          mongoose.connection.close()
        }
      })
}

module.exports.getGP = async playerID => {
    return await mongo().then(async mongoose => {
        try {
          console.log('getGP connects to mongo!')

          const result = await playerSchema.findOne({playerID})
          console.log(`Result: ${result.gamesPlayed}`)

          let rating = 1000
          let gamesPlayed = 0

          if (result) {
              rating = result.rating
              gamesPlayed = result.gamesPlayed
          } else {
              console.log('new player! adding to database')
              await new playerSchema({
                    playerID,
                    rating,
                    gamesPlayed
                }, {
                    versionKey: false
                }
              ).save()
          }
          return gamesPlayed

        } finally {
          mongoose.connection.close()
        }
      })
}

module.exports.setRating = async (playerID, newRating) => {
    return await mongo().then(async mongoose => {
        try {
          console.log('setRating connects to mongo!')

          const gp = await playerSchema.findOne({playerID})

          if (!gp) {
              gamesPlayed = 0
          } else {
              gamesPlayed = gp.gamesPlayed
          }

          const result = await playerSchema.findOneAndUpdate({
                playerID
            }, {
                'playerID': playerID, 
                'rating': newRating, 
                'gamesPlayed': gamesPlayed
            }, {
                upsert: true, 
                new: true,
                versionKey: false
            })

        } finally {
          mongoose.connection.close()
        }
      })
}

module.exports.setGP = async (playerID, newGP) => {
  return await mongo().then(async mongoose => {
      try {
        console.log('setGP connects to mongo!')

        const player = await playerSchema.findOne({playerID})

        if (!player) {
            rating = 1000
        } else {
            rating = player.rating
        }

        const result = await playerSchema.findOneAndUpdate({
              playerID
          }, {
              'playerID': playerID, 
              'rating': rating, 
              'gamesPlayed': newGP
          }, {
              upsert: true, 
              new: true,
              versionKey: false
          })

      } finally {
        mongoose.connection.close()
      }
    })
}