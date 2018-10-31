var users = [
  {
    username: 'justintunev7',
    monsterHealth: 100,
    userLevel: 200,
    monsterCounter: 1,
    experience: 50,
    tasks: [ 'homework1', 'homework2' ]
  }
];

var http = require('http');
var url = require('url');
var fs = require('fs');
var ROOT_DIR = "src/";
var port = 4201;

http.createServer(function (req, res) {
  var urlObj = url.parse(req.url, true, false);

  if (urlObj.pathname === '/users') {

    /**
     * TODO: return the array of pokemon above as a string
     * with an header status of 'ok'
     */

  } else {

    /**
     * Here is where we return all requests for files in our 'src' directory
     */
    fs.readFile(ROOT_DIR + urlObj.pathname, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  }

}).listen(port);

console.log('app is now running on port: ' + port);

