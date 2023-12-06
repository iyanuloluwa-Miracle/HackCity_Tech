// postRoutes.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { verifyToken } = require('../utils/authUtils');

// Use verifyToken as middleware in the following routes
router.post('/post/create', verifyToken, postController.createPost);
router.delete('/post/:id', verifyToken, postController.deletePost);
router.put('/post/:id', verifyToken, postController.editPost);
router.get('/post/list', verifyToken, postController.listPosts);

module.exports = router;
