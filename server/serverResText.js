const http = require('http');

const server = http.createServer((req, res) => {
  console.log('req.url:', req.url);
  console.log('req.method:', req.method);
  res.setHeader('Content-tyle', 'text/html');
  res.write('<p>Hi</p>');
  res.write('<h1>Batata</h1>')
  res.end();
});

// localhost is the default value for 2nd argument
server.listen(3000, 'localhost', () => {
  console.log('listening for requests on http://localhost:3000');
});
// localhost = IP 127.0.0.1 (own computer)