# TedTournament()

TedTournament() is a custom function for Google Sheets which returns data for March Madness (NCAA Division I Basketball Championship) games. Currently, this function supports data for 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023 for men's and women's tournaments. Data is provided in near-real-time through manual entry.

## Installation

1. Open the spreadsheet with which you would like to use this function
2. Go to Extensions > App Script
3. Choose Blank Project
4. Copy and paste the code in [TedTournament.gs](TedTournament.gs) into the body of the code overwriting anything there.
5. Name the script TedTournament
6. Click Save
7. Close the Script Editor

Now you can type =TedTournament(...) with your parameters in your spreadsheet and data will populate from my spreadsheet.

## Syntax

```code()
=TedTournament(league,year,round,game,colNumber)
```
## Sample Usage
```code*(
=TedTournament("Men",2019,64,1,1)
```

## Parameter Description
* league - The league in which you would like to pull data. This is either “Men” or “Women”
* year - The year in which you would like to pull data.
* round - Which round to consider.
  * 68 is the Round of 68 (play in games)
  * 64 is the Round of 64
  * 32 is the Round of 32
  * 16 is the Sweet 16
  * 8 is the Elite 8
  * 4 is the Final Four
  * 2 is the Final
* game - Which game to consider, top to bottom on each side of the bracket starting with left side
* colNumber - Which statistic to return. colNumber may be:
  * 1 - Top Team: The team on the top part for the game
  * 2 - Bottom Team: The team on the bottom part for the game
  * 3 - Top Team Score (This is live): The number of points the top team has score
  * 4 - Bottom Team Score (This is live): The number of points the bottom team has scored
  * 5 - Winning Team: The team that won the respective game
  * 6 - Losing Team: The team that lost the respective game
  * 7 - Game date, time, tv channel
  * 8 - Winning Team Seed: The rank of the team on the top part for the game
  * 9 - Losing Team Seed: The rank of the team on the bottom part for the game
  * 10 - Winning Team Score: The score of the team that won the game
  * 11 - Losing Team Score: The score of the team that lost the game
  * 12 - Game Status: current status for that game
    * If the game hasn’t been played it will show the date, time, and TV network of the game
    * If the game is in progress it will show which period the game is in, TV network, and current game clock
    * If the game is over it will show one of the following:
      * FINAL
      * FINAL (OT)
      * FINAL (2OT)
  * 13 - gameID: This is a unique id for the game
  * 14 - Top Team Seed : This is the seed for the top team of the game
  * 15 - Bottom Team Seed : This is the seed for the bottom team of the game
  * 16 - Start Date : This is the date of the game
  * 17 - Start Time : This is the time the game starts in Eastern Time (ET)
  * 18 - Network : This is the television network the game is on
  * 19 - Game Region : This is the region the game is played in. If a game doesn't have a region the value will be NoRegion. Regions for Play-in games will include the region the game plays into.
  * 20 - Top Team Char6 : This is the max 6 character name of the top team of the game
  * 21 - Bottom Team Char6 : This is the max 6 character name of the bottom team of the game
  * 22 - Winning Team Char6 : This is the max 6 character name of the winning top team of the game
  * 23 - Losing Team Char6 : This is the max 6 character name of the losing top team of the game

## Notes

* The function parameter must be input as numbers without “”. See Sample Usage.
* To view the source data go here: [TedTournament() Source Data](https://docs.google.com/spreadsheets/d/1DyuuT9zPSh9RdzrAF_1bY6HhyuYKckL3E6wr-sGKZTs/edit#gid=977457469)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)

## Google Sheets Templates

I maintain Google Sheets Templates for managing Individual Brackets or a Group of Brackets as a Bracket Manager. The below links will create your own private copy of the files. See the INSTRUCTIONS tab on each sheet for how to use them. You'll get a warning that says "The attached Apps Script file and functionality will also be copied. This is because the TedTournament() function comes pre-installed. To review the script, click on View Apps Script file when making the copy if you are unsure.

[Single Bracket Template](https://docs.google.com/spreadsheets/d/1izjBEQ_FIU0dJ2Z1exWMY2FwpmDP6AqHYxlldD6xhO4/copy) <--clicking on this link will open a new private copy only you have access to. Once the teams for the Tournament are set, pick your winners, sit back, and enjoy the show! The bracket will automatically update with winners and calculate winning scores. You can also use this template in conjunction with the group template below. See the HELP tabs on each template for how to use them together.

[Group Bracket Template](https://docs.google.com/spreadsheets/d/1UBEQnmpWKKHPXu4Y3xmUAlxWR4Oo9jPAXCfL_e-gMT8/copy) <--clicking on this link will open a new private copy only you have access to. Bracket Pool supports up to 100 brackets!
