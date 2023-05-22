const express = require('express');

/** Express app */
const app = express();

/** Listen for requests */
app.listen(3000);

/** Register view engine
 * Default folder for ejs files is 'views'
 * If some other name, need to set as commented below
 */
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

/** Routes
 * Express automatically sets server statusCode and setHeader Content-Type
 */
app.get('/', (req, res) => {
  const blogs = [
    { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
  ];
  res.render('index', { title: 'Home', blogs: blogs });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

/** 404 page */
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
