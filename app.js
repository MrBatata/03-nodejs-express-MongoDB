const express = require('express');

/** Express app */
const app = express();

/** Listen for requests */
app.listen(3000);

/** Routes
 * Express automatically sets server statusCode and setHeader Content-Type
 */
app.get('/', (req, res) => {
  // res.send('<p>home page</p>');
  // Express looks for an absolute path... not relative
  // res.sendFile('C:/Users/Matias/Documentos/mr-batata/back-end/03-nodejs-express-MongoDB/views/index.html');
  res.sendFile('./views/index.html', { root: __dirname });
});

app.get('/about', (req, res) => {
  // res.send('<p>about page</p>');
  res.sendFile('./views/about.html', { root: __dirname });
});

/** Redirects */
app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

/** 404 page */
app.use((req, res) => {
  res.status(404).sendFile('./views/404.html', { root: __dirname });
});
