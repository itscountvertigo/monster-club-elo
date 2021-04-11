const mongo = require('./mongo')
const playerSchema = require('./schemas/player-schema')

module.exports.getRating = async (playerID, gameMode) => {
    return await mongo().then(async mongoose => {
        try {
          console.log(`getGP: ${playerID}, ${gameMode}`)
          
          const result = await playerSchema.findOne({playerID})

          let trialRating = 1000
          let royaleRating = 1000
          let mazeRating = 1000
          let trialGP = 0
          let royaleGP = 0
          let mazeGP = 0

          if (result) {
              trialRating = result.trialRating
              royaleRating = result.royaleRating
              mazeRating = result.mazeRating
              trialGP = result.trialGP
              royaleGP = result.royaleGP
              mazeGP = result.mazeGP
          
          } else {
              console.log('new player! adding to database')
              await new playerSchema({
                  playerID,
                  trialRating,
                  royaleRating,
                  mazeRating,
                  trialGP,
                  royaleGP,
                  mazeGP
                }, {
                    versionKey: false
                }
              ).save()
          }

          if (gameMode == 'mt') {
            console.log(`Result: ${trialRating}`)
            return trialRating
          }
          else if (gameMode == 'mr') {
            console.log(`Result: ${royaleRating}`)
            return royaleRating
          }
          else if (gameMode == 'mm') {
            console.log(`Result: ${mazeRating}`)
            return mazeRating
          }
        } finally {
          mongoose.connection.close()
        }
      })
}

module.exports.getGP = async (playerID, gameMode) => {
    return await mongo().then(async mongoose => {
        try {
          console.log(`getGP: ${playerID}, ${gameMode}`)

          const result = await playerSchema.findOne({playerID})

          let trialRating = 1000
          let royaleRating = 1000
          let mazeRating = 1000
          let trialGP = 0
          let royaleGP = 0
          let mazeGP = 0

          if (result) {
              trialRating = result.trialRating
              royaleRating = result.royaleRating
              mazeRating = result.mazeRating
              trialGP = result.trialGP
              royaleGP = result.royaleGP
              mazeGP = result.mazeGP

          } else {
              console.log('new player! adding to database')
              await new playerSchema({
                    playerID,
                    trialRating,
                    royaleRating,
                    mazeRating,
                    trialGP,
                    royaleGP,
                    mazeGP
                }, {
                    versionKey: false
                }
              ).save()
          }
          
          if (gameMode == 'mt'){
            return trialGP
          }
          else if (gameMode == 'mr'){
            return royaleGP
          }
          else if (gameMode == 'mm'){
            return mazeGP
          }

        } finally {
          mongoose.connection.close()
        }
      })
}

module.exports.setRating = async (playerID, newRating, gameMode) => {
    return await mongo().then(async mongoose => {
        try {
          console.log(`setRating: ${playerID}, ${gameMode}`)

          if (gameMode == 'mt') {
            await playerSchema.findOneAndUpdate({
              playerID
          }, {
              'trialRating': newRating
          }, {
              upsert: true, 
              new: true,
              versionKey: false
          })
          }
          else if (gameMode == 'mr') {
            await playerSchema.findOneAndUpdate({
              playerID
          }, {
              'royaleRating': newRating
          }, {
              upsert: true, 
              new: true,
              versionKey: false
          })
          }
          else if (gameMode == 'mm') {
            await playerSchema.findOneAndUpdate({
              playerID
          }, {
              'mazeRating': newRating
          }, {
              upsert: true, 
              new: true,
              versionKey: false
          })
          }
        } finally {
          mongoose.connection.close()
        }
      })
}

module.exports.setGP = async (playerID, newGP, gameMode) => {
  return await mongo().then(async mongoose => {
    try {
      console.log(`setGP: ${playerID}, ${gameMode}`)

      if (gameMode == 'mt') {
        await playerSchema.findOneAndUpdate({
          playerID
      }, {
          'trialGP': newGP
      }, {
          upsert: true, 
          new: true,
          versionKey: false
      })
      }
      else if (gameMode == 'mr') {
        await playerSchema.findOneAndUpdate({
          playerID
      }, {
          'royaleGP': newGP
      }, {
          upsert: true, 
          new: true,
          versionKey: false
      })
      }
      else if (gameMode == 'mm') {
        await playerSchema.findOneAndUpdate({
          playerID
      }, {
          'mazeGP': newGP
      }, {
          upsert: true, 
          new: true,
          versionKey: false
      })
      }
    } finally {
      mongoose.connection.close()
    }
  })
}

module.exports.leaderboard = async (gameMode) => {
  return await mongo().then(async mongoose => {
    try {
      console.log(`leaderboard: ${gameMode}`)

      if (gameMode == 'mt') {
        lb = await playerSchema.find({trialGP: {$gt: 0}}).sort({'trialRating': -1}).limit(10)  
      }
      else if (gameMode == 'mr') {
        lb = await playerSchema.find({royaleGP: {$gt: 0}}).sort({'royaleRating': -1}).limit(10)  
      }
      else if (gameMode == 'mm') {
        lb = await playerSchema.find({mazeGP: {$gt: 0}}).sort({'mazeRating': -1}).limit(10)  
      }

      let outputArray = []
      
      if (gameMode == 'mt') {
        for (i = 0; i < lb.length; i++) {
          const { playerID, trialRating } = lb[i]
          outputArray.push([playerID, trialRating])
        }
      }
      else if (gameMode == 'mr') {
        for (i = 0; i < lb.length; i++) {
          const { playerID, royaleRating } = lb[i]
          outputArray.push([playerID, royaleRating])
        }
      }
      else if (gameMode == 'mm') {
        for (i = 0; i < lb.length; i++) {
          const { playerID, mazeRating } = lb[i]
          outputArray.push([playerID, mazeRating])
        }
      }

      return outputArray

    } finally {
      mongoose.connection.close()
    }
  })
}

module.exports.init_new_ratings = async() => {
  return await mongo().then(async mongoose => {
    try {
      results = await playerSchema.updateMany({}, {$set: {
        'royaleRating': 1000,
        'mazeRating': 1000,
        'royaleGP': 0,
        'mazeGP': 0
      }})

      return results
    } finally {
      mongoose.connection.close()
    }
  })
}