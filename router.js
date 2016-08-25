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
    res.write(username + "\n");
    res.end("Footer\n");
  }
}

module.exports.home = home;
module.exports.user = user;
