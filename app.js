var http = require("http");
var https = require("https");
var username = "harryjamesuk";

// Print out message
function printMessage(username, badgeCount, points) {
  var message = username + " has " + badgeCount + " total badge(s) and " +
  points + " points in JavaScript";
  console.log(message);
}

// Print out error messages
function printError(err) {
  console.error(err.message);
}

var request = https.get("https://teamtreehouse.com/" + username + ".json",
function(response) {
  var body = "";
  response.on("data", function(chunk) {
    body += chunk;
  });
  response.on("end", function() {
    if (response.statusCode == 200) {
      try {
        var profile = JSON.parse(body);
      } catch (err) {
        // Parse error.
        printError(err);
      } // End catch.
      printMessage(username, profile.badges.length, profile.points.JavaScript);
    } else {
      // Status code error.
      printError({message: "There was an error getting the profile for " +
      username + " (" + http.STATUS_CODES[response.statusCode] + ")."});
    } // End if/else statusCode check.
  }); // End response.on().
}); // End https.get().

// Handle errors
// Connection error
request.on("error", function(err) {
  printError(err);
});
