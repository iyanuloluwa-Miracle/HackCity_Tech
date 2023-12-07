// controllers/postController.js
require("../models/database");
const Post = require("../models/Post");

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user._id; 

    const post = new Post({ title, content, author: userId });
    await post.save();

    res
      .status(201)
      .json({
        success: true,
        data: post,
        message: "Post created successfully",
      });
  } catch (err) {
    res
      .status(400)
      .json({
        success: false,
        data: null,
        error: err.message,
        message: "Post creation failed",
      });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    
    const post = await Post.findOne({ _id: postId, author: userId });
    if (!post) {
      return res
        .status(403)
        .json({ success: false, data: null, message: "Permission denied" });
    }

    await Post.findByIdAndDelete(postId);

    res
      .status(200)
      .json({
        success: true,
        data: null,
        message: "Post deleted successfully",
      });
  } catch (err) {
    res
      .status(400)
      .json({
        success: false,
        data: null,
        error: err.message,
        message: "Post deletion failed",
      });
  }
};

const editPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;
    const { title, content } = req.body;

    const post = await Post.findOne({ _id: postId, author: userId });
    if (!post) {
      return res
        .status(403)
        .json({ success: false, data: null, message: "Permission denied" });
    }

    post.title = title;
    post.content = content;
    await post.save();

    res
      .status(200)
      .json({
        success: true,
        data: post,
        message: "Post updated successfully",
      });
  } catch (err) {
    res
      .status(400)
      .json({
        success: false,
        data: null,
        error: err.message,
        message: "Post update failed",
      });
  }
};

const listPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "email"); 
    res
      .status(200)
      .json({
        success: true,
        data: posts,
        message: "Posts retrieved successfully",
      });
  } catch (err) {
    res
      .status(400)
      .json({
        success: false,
        data: null,
        error: err.message,
        message: "Error retrieving posts",
      });
  }
};

module.exports = {
  createPost,
  deletePost,
  editPost,
  listPosts,
};
