const postModel = require('../models/Post');

/**
 @typedef Post
 @type {Object}
 @property {Object} post A post object
 @property {Number} post.userId The post's user Id
 @property {Number} post.id The post's Id
 @property {String} post.title the post's title
 @property {String} post.body the post's title
 */

/** 
 Gets All Posts from the Database
 @returns {Post[]}
 */
const getPosts = _ => 
  postModel.find({});

/**
 Inserts a new post into the Database
 @param {Post}
 @returns {Post}
 */
const createPost = payload => 
  postModel.create(payload);

/**
 Updates a post with specific Id
 @param {Post}
 @returns {Post}
 */
const updatePost = payload => 
  postModel.findByIdAndUpdate(payload._id, payload);

const deletePost = id => 
  postModel.findByIdAndDelete(id);

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost
}