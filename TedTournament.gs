/*====================================================================================================================================*
  TedTournament by Ted Juch and Adam Lusk
 *====================================================================================================================================*
  Version:      2.4.1
  Project Page: https://github.com/TedJuch/TedTournament
  License:      GNU General Public License, version 3 (GPL-3.0) 
                http://www.opensource.org/licenses/gpl-3.0.html
  ------------------------------------------------------------------------------------------------------------------------------------
  Change Log:
  
  2.4.1   Added new attributes: Game Region
  2.4.0   Added support for the 2023 tournament
  2.3.0   Added new attributes: Start Date, Start Time (in ET), and Network to break apart the Game Bracket information
  2.2.0   Updated README for Game Status to reflect new game status mappings
  2.1.1   Bugfix for game data lookup
  2.0.0   Added support for FIRST FOUR (play-in games), remapped 2018, 2019, 2020, 2021 sheet maps, removed support for future years
  1.0.0   Initial release
 *====================================================================================================================================*/

function TedTournament(league, year, round, game, colNumber) {
  var key = "1DyuuT9zPSh9RdzrAF_1bY6HhyuYKckL3E6wr-sGKZTs"
  var sheetMap = {"Women 2023 Tournament Data": 50550597,
                  "Men 2023 Tournament Data": 1608514680,
                  "Women 2022 Tournament Data": 289728400,
                  "Men 2022 Tournament Data": 309823818,
                  "Women 2021 Tournament Data": 100993931,
                  "Men 2021 Tournament Data": 1977203751,
                  "Women 2020 Tournament Data": 945214705,
                  "Men 2020 Tournament Data": 1120860517,
                  "Women 2019 Tournament Data": 158092634,
                  "Men 2019 Tournament Data": 1169112690,
                  "Women 2018 Tournament Data": 543294552,
                  "Men 2018 Tournament Data": 1570620465,
                  "Women 2017 Tournament Data": 2140263816,
                  "Men 2017 Tournament Data": 1324422854,
                  "Women 2016 Tournament Data": 985846888,
                  "Men 2016 Tournament Data": 431454258,
                  "Women 2015 Tournament Data": 665120600,
                  "Men 2015 Tournament Data": 230086643,
                  "Women 2014 Tournament Data": 856902930,
                  "Men 2014 Tournament Data": 855551724};
  var sheetName = league + " " + year + " Tournament Data";
  var gameData = getValuesPublic(key, sheetMap[sheetName], "A1:V68");
 
  for (var i = 0; i < gameData.length; i++)
    if (gameData[i][1] == round && gameData[i][2] == game)
      return gameData[i][colNumber + 2];
  
  return "Combination not found.";
}
 
function getValuesPublic(key, gid, range) {
  var content = UrlFetchApp.fetch("https://spreadsheets.google.com/tq?&tq=&key=" + key + "&gid=" + gid + "&range=" + range);
  var rows = (JSON.parse(/({.+})[^}]*$/.exec(content)[1])).table.rows;
  var output = [], temp;
  for (var i = 0, length = rows.length; i < length; i++) {
    temp = [];
    for (var j = 0, width = rows[i].c.length; j < width; j++)
      temp.push(rows[i].c[j] ? rows[i].c[j].v || "" : "");
    output.push(temp);
  }
  return output;
}
 
function onInstall(e) {
  onOpen(e);
}
 
function onOpen(e) {
}
