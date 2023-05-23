const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  snippet: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true
  },
}, { timestamps: true });

// mongoose will plurilize 'Blog' to 'blogs' and look for that db
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;