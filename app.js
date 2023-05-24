const express = require('express');
/** Morgan middleware: logger */
const morgan = require('morgan');
/** Mongoose: easier to use mongodb */
const mongoose = require('mongoose');
/** Express Routes */
const blogRoutes = require('./routes/blogRoutes');

/** Express app */
const app = express();

/** MongoDB user connection */
const dbName = 'node-db-example';
const dbURI = `mongodb+srv://user01:user01@03-nodejs-express-mongo.jb6rogh.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    console.log('connected to db')
    /** Server Listener for requests
     * I would only want the server to start listening if we succesfully connect to db
     */
    app.listen(3000)
  })
  .catch((err) => console.log(err))

/** EJS package */
app.set('view engine', 'ejs');

/** Express middlewares - Static Files */
app.use(express.static('public'));
/** Express middlewares - data from forms */
app.use(express.urlencoded({ extended: true }))
/** Morgan middleware */
app.use(morgan('dev'));

/** Home route */
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

/** About route */
app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

/** Blogs routes methods (GET, POST, DELETE) */
app.use('/blogs', blogRoutes);

/** 404 route */
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});