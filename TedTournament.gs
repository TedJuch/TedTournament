/*====================================================================================================================================*
  TedTournament by Ted Juch and Adam Lusk
 *====================================================================================================================================*
  Version:      2.7.1
  Project Page: https://github.com/TedJuch/TedTournament
  License:      GNU General Public License, version 3 (GPL-3.0) 
                http://www.opensource.org/licenses/gpl-3.0.html
  ------------------------------------------------------------------------------------------------------------------------------------
  Change Log:
  
  2.7.1   Migrated UID generator to custom formula to fix group template tracking permissions ping bug.
  2.7.0   Added support for the 2026 tournaments, dynamic API caching based on season dates to improve performance, and an anonymous usage ping to track active templates.
  2.6.0   Added support for the 2025 tournaments
  2.5.0   Added support for the 2024 tournaments
  2.4.2   Added new attributes: Top Team Char6, Bottom Team Char6, Winning Team Char6, Losing Team Char6
  2.4.1   Added new attributes: Game Region
  2.4.0   Added support for the 2023 tournaments
  2.3.0   Added new attributes: Start Date, Start Time (in ET), and Network to break apart the Game Bracket information
  2.2.0   Updated README for Game Status to reflect new game status mappings
  2.1.1   Bugfix for game data lookup
  2.0.0   Added support for FIRST FOUR (play-in games), remapped 2018, 2019, 2020, 2021 sheet maps, removed support for future years
  1.0.0   Initial release
 *====================================================================================================================================*/

function TedTournament(league, year, round, game, colNumber) {
  trackUsage(league, year); // Anonymous tracker to count active spreadsheets (pings once per 6 hours)

  var key = "1DyuuT9zPSh9RdzrAF_1bY6HhyuYKckL3E6wr-sGKZTs"
  var sheetMap = {"Women 2026 Tournament Data": 1726926731,
                  "Men 2026 Tournament Data": 107716179,
                  "Women 2025 Tournament Data": 219886598,
                  "Men 2025 Tournament Data": 914813182,
                  "Women 2024 Tournament Data": 2079808804,
                  "Men 2024 Tournament Data": 448317216,
                  "Women 2023 Tournament Data": 50550597,
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
  var gid = sheetMap[sheetName];
  
  if (!gid) {
    return "Unsupported league or year.";
  }
  
  var gameData = getValuesPublicCached(key, gid, "A1:Z68");
 
  for (var i = 0; i < gameData.length; i++) {
    if (gameData[i][1] == round && gameData[i][2] == game) {
      return gameData[i][colNumber + 2];
    }
  }
  
  return "Combination not found.";
}
 
function getValuesPublicCached(key, gid, range) {
  var cache = CacheService.getScriptCache();
  var cacheKey = "TourneyData_" + gid + "_" + range;
  var cachedData = cache.get(cacheKey);

  if (cachedData != null) {
    return JSON.parse(cachedData); 
  }

  var content = UrlFetchApp.fetch("https://spreadsheets.google.com/tq?&tq=&key=" + key + "&gid=" + gid + "&range=" + range);
  var rows = (JSON.parse(/({.+})[^}]*$/.exec(content)[1])).table.rows;
  var output = [], temp;
  
  for (var i = 0, length = rows.length; i < length; i++) {
    temp = [];
    for (var j = 0, width = rows[i].c.length; j < width; j++) {
      temp.push(rows[i].c[j] ? rows[i].c[j].v || "" : "");
    }
    output.push(temp);
  }
  
  // Determine cache duration based on the date
  var currentDate = new Date();
  var cacheDuration = 21600; // Default to 6 hours (21600 seconds) in the off-season. Max is 6 hours
  
  // Define the exact tournament window (Months are 0-indexed: 2 = March, 3 = April)
  // 2026 Tournament: March 15th to April 7th (covering the entire Men's and Women's schedules)
  var tournamentStart = new Date(currentDate.getFullYear(), 2, 15); 
  // Add a 1-day buffer (April 7th) to ensure late-night championship games on the 6th are fully covered
  var tournamentEnd = new Date(currentDate.getFullYear(), 3, 7);
  
  // If the current date is within the tournament window, cache for only 60 seconds
  if (currentDate >= tournamentStart && currentDate <= tournamentEnd) {
    cacheDuration = 60;
  }
  
  // Cache the result dynamically 
  cache.put(cacheKey, JSON.stringify(output), cacheDuration); 
  
  return output;
}
 
function onInstall(e) {
  onOpen(e);
}
 
/**
 * Generates a persistent unique ID for Google Sheet template tracking.
 * @customfunction
 */
function getTrackingId() {
  try {
    var props = PropertiesService.getDocumentProperties();
    var uid = props.getProperty("TedTournament_UID");
    
    // Generate a permanent, random anonymous ID for this spreadsheet if it doesn't have one
    if (!uid) {
      uid = "sheet_" + Math.random().toString(36).substring(2, 12);
      props.setProperty("TedTournament_UID", uid);
    }
    
    return uid;
  } catch (err) {
    return "sheet_error_" + Math.random().toString(36).substring(2, 6);
  }
}

function trackUsage(league, year) {
  var cache = CacheService.getScriptCache();
  var pingCacheKey = "TedTournament_Ping_" + league + "_" + year;
  
  // Only ping once every 6 hours (or if the cache drops) to avoid spamming the form
  if (cache.get(pingCacheKey) != null) {
    return;
  }

  // Prevent race conditions when 60+ spreadsheet formulas calculate at the exact same millisecond
  var lock = LockService.getScriptLock();
  // Try to acquire a lock for up to 1 second. If we can't, another cell is already tracking, so exit.
  if (!lock.tryLock(1000)) {
    return;
  }
  
  try {
    // Check cache one more time in case another cell just finished and populated it
    if (cache.get(pingCacheKey) != null) {
      return;
    }
    
    // Set the cache IMMEDIATELY so any newly starting cells skip this entirely
    cache.put(pingCacheKey, "pinged", 21600); 

    var props = PropertiesService.getDocumentProperties();
    var uid = props.getProperty("TedTournament_UID");
    
    // Generate a permanent, random anonymous ID for this spreadsheet if it doesn't have one
    if (!uid) {
      uid = "sheet_" + Math.random().toString(36).substring(2, 12);
      props.setProperty("TedTournament_UID", uid);
    }
    
    // Post the ID to the hidden Google Form
    var formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfWNl-35dRt_UlggVqCqzpkMUsmVW2btfPdSp47fM3iEZ3sXQ/formResponse";
    var payload = {
      "entry.2037412024": "Formula",
      "entry.1548934140": uid,
      "entry.368804083": "2.7.1",
      "entry.977408474": league || "Unknown",
      "entry.1183376038": year || "Unknown"
    };
    
    var options = {
      "method": "post",
      "payload": payload,
      "muteHttpExceptions": true // If the form fetch fails, don't crash the bracket formulas
    };
    
    UrlFetchApp.fetch(formUrl, options);
    
  } catch (e) {
    // Fail silently
  } finally {
    // Always release the lock when done
    lock.releaseLock();
  }
}
