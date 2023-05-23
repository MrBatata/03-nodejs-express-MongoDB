const express = require('express');

/** Morgan middleware: logger
 * 3rd party middleware
 */
const morgan = require('morgan');

/** Mongoose: easier to use mongodb */
const mongoose = require('mongoose');
const Blog = require('./models/blog');

/** Express app */
const app = express();

/** MongoDB user connection */
const testURI = 'mongodb+srv://user01:user01@03-nodejs-express-mongo.jb6rogh.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'node-db-example';
const dbURI = `mongodb+srv://user01:user01@03-nodejs-express-mongo.jb6rogh.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    console.log('connected to db')
    /** Server Listener for requests
     * I would only want the server to start listening if we succesfully connect to db
     */
    app.listen(3000)
  }
  )
  .catch((err) => console.log(err))

/** EJS package
 * Register view engine to use 
 * Default folder for ejs files is 'views'
 * If some other name, need to set as commented below
 */
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

/** Static files middleware
 * Now we are able to access 'public' from browser
 */
app.use(express.static('public'));

/** Custom middleware */
app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  // Need a command to escape the .use()
  next();
});

app.use((req, res, next) => {
  console.log('in the next middleware');
  next();
});

/** Morgan middleware
 * consoles log response status and ms
 */
app.use(morgan('dev'));

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

/** Middleware won't be executed if req to '/'
 * As the response would stop the code execution
 */
app.use((req, res, next) => {
  console.log('not showed if in home');
  next();
});

/** Routes continue */
app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

/** Routes with mongo & mongoose */
// mongoose & mongo tests
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog',
    snippet: 'about my new blog',
    body: 'more about my new blog'
  })

  blog.save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/single-blog', (req, res) => {
  Blog.findById('646cd288318ec45ee8af043d')
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { blogs: result, title: 'All blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});

/** 404 page */
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});