var https = require("https");
var username = "harryjamesuk";

function printMessage(username, badgeCount, points) {
  var message = username + " has " + badgeCount + " total badge(s) and " +
  points + " points in JavaScript";
  console.log(message);
}

var request = https.get("https://teamtreehouse.com/" + username + ".json",
function(response) {
  console.log(response.statusCode);
});

request.on("error", function(err) {
  console.error(err.message);
});
