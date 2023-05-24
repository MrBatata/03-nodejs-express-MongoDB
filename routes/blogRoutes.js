const express = require('express');
const blogController = require('../controllers/blogController');

/** Express router
 * Miniapp standalone ...
 * that handles the routes and middleware
 * 
 */
const router = express.Router();

// Route GET -> /blogs
router.get('/', blogController.blog_index);
// Route POST -> /blogs
router.post('/', blogController.blog_create_post);
// Route GET -> /blogs/create
// "create" route should be above "/:id" to prevent considering "create" as a params
router.get('/create', blogController.blog_create_get);
// Route GET -> /blogs/:id (w/params)
router.get('/:id', blogController.blog_details);
// Route DELETE -> /blogs/:id (w/params)
router.delete('/:id', blogController.blog_delete);

module.exports = router;