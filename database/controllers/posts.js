const postModel = require('../models/Post');

/**
 @typedef Post
 @type {Object}
 @property {Object} post._id The post's Database Id
 @property {Object} post A post object
 @property {Number} post.userId The post's user Id
 @property {String} post.title the post's title
 @property {String} post.body the post's title
 */

/** 
 Gets All Posts from the Database
 @returns {Post[]}
 */
const getPosts = () => 
  postModel.find({});

/** 
 Gets All Posts from the Database
 @returns {Post[]}
 @param {Post.id}
*/
const getPost = id => 
  postModel.findById(id);

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
const updatePost = (id, payload) => 
  postModel.findByIdAndUpdate(id, payload);

/**
 Deletes a post with specific Id
 @param {Post._id}
 @returns {null}
 */
const deletePost = id => 
  postModel.findByIdAndDelete(id);

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
}