# Monster Club Elo-rating bot
This is the Elo-rating bot for the Monster Club Discord server. It stores and updates players' Elo-rating after matches.

## About Monster Club
Monster Club is a small physical trading card game. You can find out more about them on:

- [Their site/card shop](https://www.themonsterclubcorporation.com)
- [Their Instagram](https://www.instagram.com/themonsterclubcorporation/)
- [Their YouTube](https://www.youtube.com/channel/UCWnitVZdHqHOqJDINu_5scQ)

![pog](https://jimdo-storage.freetls.fastly.net/image/198464329/da1222e5-09c9-4b3f-9f6f-81f603f5fa12.png)

## Commands
A few examples of what this bot can do:

```!win [@opponent] [gamemode] or !lose [@opponent] [gamemode]```

The bot will ask your opponent for confirmation about the match and update your rating accordingly when the opponent answers 'yes'.

```!rating [@target (optional)] [gamemode]```

Shows you your current rating, or the rating of the person you @mention (if you do).

```!leaderboard [gamemode]```

Shows the top 10 leaderboard of a particular gamemode.

If you can't figure something out regarding the bot, try using ```!help```. If you can't figure out something not related to the bot, try using ```!turtles```.

## Features
- Uses a MongoDB database to store ratings, number of games played and more.
- Uses an Elo algorithm to calculate your new rating based on what your opponent's rating is.

## Todo's
- add ranks you gain for life based on what rating you have achieved
- add support for factions (so there is a faction leaderboard)
