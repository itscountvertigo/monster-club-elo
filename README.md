# monster_club_elo
ELO Rating bot for the Monster Club Discord servrer

## Commands
A few examples of what this bot can do:

- !win [@opponent] [gamemode] or !lose [@opponent] [gamemode]

The bot will ask your opponent for confirmation about the match and update your rating accordingly when the opponent answers 'yes'.

- !rating [@target (optional)] [gamemode]

Shows you your current rating, or the rating of the persion you @mention (if you do)

- !leaderboard [gamemode]

Shows the leaderboard of a gamemode

## Features

- Uses a mongo database with mongoose to store ratings, number of games played and more.
- Uses an ELO algorithm to calculate your new rating based on what your opponent's rating is

## TODO
- add ranks you gain for life based on what rating you have achieved
- add support for factions (so there is a faction leaderboard)