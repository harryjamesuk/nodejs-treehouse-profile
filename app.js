// Create web server
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    homeRoute(req, res);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// Handle HTTP route GET / and POST /
function homeRoute(req, res) {
  res.statusCode = 200;
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write("Header\n");
  res.write("Search\n");
  res.end("Footer\n");
}

// Handle HTTP route GET /username

// Read files and merge in values.
