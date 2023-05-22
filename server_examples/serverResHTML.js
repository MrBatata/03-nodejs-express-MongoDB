const http = require('http');
const fs = require('fs');

/** Server creation */
const server = http.createServer((req, res) => {

  console.log('req.url:', req.url);
  console.log('req.method:', req.method);

  /** Set header content tyle */
  res.setHeader('Content-Type', 'text/html');

  /** Send static html file */
  if (req.url === '/static') {
    fs.readFile('./views/staticIndex.html', (err, data) => {
      if (err) {
        console.log(err);
        res.end();
      } else {
        res.write(data);
        res.end();
      }
    });
  };

  /** Routing */
  let path = './views/';
  switch (req.url) {
    case '/':
      path = path + 'index.html'; // same as `+=`
      res.statusCode = 200;
      break;
    case '/about':
      path += 'about.html';
      res.statusCode = 200;
      break;
    case '/about-us':
      res.statusCode = 301;
      res.setHeader('Location', '/about');
      res.end();
      break;
    default:
      path += '404.html';
      res.statusCode = 404;
  }

  /** Send dynamic html */
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    }
    //res.write(data);
    res.end(data);
  });

});

/** Server listener */
// localhost is the default value for 2nd argument
server.listen(3000, 'localhost', () => {
  console.log('listening for requests on http://localhost:3000');
});
// localhost = IP 127.0.0.1 (own computer)