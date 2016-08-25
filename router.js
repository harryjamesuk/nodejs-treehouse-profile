var Profile = require("./profile.js");

function home(req, res) {
  res.statusCode = 200;
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write("Header\n");
  res.write("Search\n");
  res.end("Footer\n");
}

function user(req, res) {
  var username = req.url.replace("/", "");
  if (username.length > 0) {
    // Exists
    res.statusCode = 200;
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write("Header\n");

    var studentProfile = new Profile(username);
    studentProfile.on("end", function(profileJSON) {
      // Show profile.

      // Store the values that we need.
      var values = {
        avatarUrl: profileJSON.gravatar_url,
        username: profileJSON.profile_name,
        badgeCount: profileJSON.badges.length,
        jsPoints: profileJSON.points.JavaScript
      };

      // Response
      res.write(values.username + " has " + values.badgeCount + " badges\n");
      res.end("Footer\n");
    });
    studentProfile.on("error", function(err) {
      // Show error.
      res.write(err.message + "\n");
      res.end("Footer\n");
    });
  }
}

module.exports.home = home;
module.exports.user = user;
