# monster_club_elo
ELO Rating bot for the Monster Club Discord servrer

## Commands
- !win [@opponent] or !lose [@opponent]

The bot will ask your opponent for confirmation about the match and update your rating accordingly when the opponent answers 'yes'.

- !rating [@target (optional)]

Shows you your current rating, or the rating of the persion you @mention (if you do)

- !setrating [@target (optional)] [new rating]

Sets your (or the person you @mentioned if you did), rating to specified new rating. Only works with "Elo Bot Manager" role

- !setgp / !setgamesplayed

Sets your (or the person you @mentioned if you did), number of games played to specified new number of games played. Only works with "Elo Bot Manager" role.

## Features

- Uses a mongo database with mongoose to store ratings, number of games played and more.
- Uses an ELO algorithm to calculate your new rating based on what your opponent's rating is

## TODO
- add ranks you gain for life based on what rating you have achieved
- add support for factions (so there is a faction leaderboard)
- add !leaderboard
