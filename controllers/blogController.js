const Blog = require('../models/blog');

/** Middlewares to use in /blogs routes */

/** Gets all blogs and sort by creation date */
const blog_index = (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('blogs/index', { blogs: result, title: 'All blogs' });
    })
    .catch(err => {
      console.log(err);
    });
};

/** Gets specific blog data */
const blog_details = (req, res) => {
  const id = req.params.id;
  // console.log(id);
  Blog.findById(id)
    .then(result => {
      // console.log(result);
      res.render('blogs/details', { blog: result, title: 'Selected Blog' });
    })
    .catch(err => {
      console.log(err);
      res.render('404', {title: 'Blog not found'})
    });
};

/** Renders create page
 * as it is a request inside "/blogs"
 */
const blog_create_get = (req, res) => {
  res.render('blogs/create', { title: 'Create a new blog' });
};

/** Creates a new blog from form input and submittion */
const blog_create_post = (req, res) => {
  // previously need express middleware to handle body
  // console.log(req.body);
  const blog = new Blog(req.body);

  blog.save()
    .then(result => {
      // res.send(result); // we don't want to show the created blog object on the browser
      // blog and response are the same
      res.redirect('/blogs');
    })
    .catch(err => {
      console.log(err);
    });
};

/** Creates a specific blog */
const blog_delete = (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ backtoblogs: '/blogs' });
    })
    .catch(err => console.log(err));
};

/** Export all middlewares to use them on blogRoutes */
module.exports = {
  blog_index, 
  blog_details, 
  blog_create_get, 
  blog_create_post, 
  blog_delete
};