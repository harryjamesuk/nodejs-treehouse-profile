var Profile = require("./profile.js");
var renderer = require("./renderer.js");
var queryString = require("querystring");

var commonHeaders = {'Content-Type': 'text/html'};

function home(req, res) {
  if (req.method.toUpperCase() === "GET") {
    res.writeHead(200, commonHeaders);
    renderer.view("header", {}, res);
    renderer.view("search", {}, res);
    renderer.view("footer", {}, res);
    res.end();
  } else {
    req.on("data", function(postBody) {
      var query = queryString.parse(postBody.toString());
      res.writeHead(303, {"Location": "/" + query.username });
      res.end();
    });
  }
}

function user(req, res) {
  var username = req.url.replace("/", "");
  if (username.length > 0) {
    // Exists
    res.statusCode = 200;
    res.writeHead(200, commonHeaders);
    renderer.view("header", {}, res);

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
      renderer.view("profile", values, res);
      renderer.view("footer", values, res);
      res.end();
    });
    studentProfile.on("error", function(err) {
      // Show error.
      renderer.view("error", {errorMsg: err.message}, res);
      renderer.view("search", {}, res);
      renderer.view("footer", {}, res);
      res.end();
    });
  }
}

module.exports.home = home;
module.exports.user = user;
