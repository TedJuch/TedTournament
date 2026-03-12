# TedTournament

TedTournament is a project that provides Google Sheets templates and a custom function for managing March Madness (NCAA Division I Basketball Championship) brackets. It includes a custom function for fetching live tournament data and pre-built templates for running your own bracket pools.

## Google Sheets Templates

I maintain Google Sheets Templates for managing Individual Brackets or a Group of Brackets as a Bracket Manager. The below links will create your own private copy of the files. **The most up-to-date version of both templates is currently Version 10.**

**Note on Copying:** When you click the links below, Google will show a warning: *"The attached Apps Script file and functionality will also be copied."* **This is completely normal and safe.** It appears because the `TedTournament()` script is pre-installed in the template to support the tournament data functions, and to anonymously track active usage of the template and functions. As detailed in the *Privacy and Usage Tracking* section below, the script only logs a randomly generated ID, the template version, the requested league, and the year. If you'd like to verify this code before copying, you can click "View Apps Script file" right on the copy screen.

**Note on Formulas:** You may also see a yellow bar below the menus that says *"Warning: Some formulas are trying to send and receive data from external parties."* This is a standard Google Sheets security feature that appears whenever a spreadsheet uses `IMPORTRANGE` or `IMPORTDATA` functions to pull in data or communicate with the backend tracking script. You can safely click **Allow access**.

[Single Bracket Template](https://docs.google.com/spreadsheets/d/1izjBEQ_FIU0dJ2Z1exWMY2FwpmDP6AqHYxlldD6xhO4/copy) <--clicking on this link will open a new private copy only you have access to. Once the teams for the Tournament are set, pick your winners, sit back, and enjoy the show! The bracket will automatically update with winners and calculate winning scores. You can also use this template in conjunction with the group template below. See the HELP tabs on each template for how to use them together.

[Group Bracket Template](https://docs.google.com/spreadsheets/d/1UBEQnmpWKKHPXu4Y3xmUAlxWR4Oo9jPAXCfL_e-gMT8/copy) <--clicking on this link will open a new private copy only you have access to. Bracket Pool supports up to 100 brackets!

## TedTournament() Custom Function

TedTournament() is a custom function for Google Sheets which returns data for March Madness (NCAA Division I Basketball Championship) games. Currently, this function supports data for 2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014 for men's and women's tournaments.

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

## Pulling Complete Game Data Into a Spreadheet without using TedTournament()

If you're building you're own custom bracket and want to use my data, consider pulling in the entire dataset using the [importrange()](https://support.google.com/docs/answer/3093340?hl=en) Google Sheets function.

In any tab in your own spreadsheet use the following:

```code()
=importrange("1DyuuT9zPSh9RdzrAF_1bY6HhyuYKckL3E6wr-sGKZTs","Men 2026 Tournament Data!A:Z")
```

* Be sure you [authorize access](https://support.google.com/docs/answer/3093340?hl=en#zippy=%2Cpermission-access) if you're getting an error.
* To pull in other years or gender simply change the "Men" to "Women" and the year to a year supported by TedTournament().

## Privacy and Usage Tracking

In version 2.7.0, an anonymous usage tracking feature was introduced to tally how many unique spreadsheets are actively using the custom function and the templates during each tournament season.

**Function Usage Tracking:**
When you use the `=TedTournament()` formula, the script implicitly pings an anonymous usage log with:
* A randomly generated ID (e.g., `sheet_abc123`)
* The script version (e.g., `2.7.0`)
* The requested league
* The requested year

**Template Usage Tracking:**
If you use the standalone templates linked below, they also contain an anonymous tracker that logs:
* A randomly generated ID (e.g., `sheet_abc123`)
* The template version (e.g., `Template_2026_Initial` or `Template_2026_Active`)
* The selected league 
* The selected year

**This feature does not collect or track any personal information (no emails, no names, no bracket selections).**

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)


## Support
If **TedTournament** saved your bracket pool or made your spreadsheet life easier, feel free to [buy me a tournament snack](https://venmo.com/code?user_id=2117148897968128612&created=1772685410) (last 4 digits of phone number: 0801) or [buy me a tournament drink](https://www.buymeacoffee.com/tedj)!
