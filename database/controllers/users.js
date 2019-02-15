/**
 @typedef User
 @type {Object}
 @property {Object} user A user object
 @property {Object} user._id The user's db Id
 @property {String} user.name The user's name
 @property {String} user.email The user's email
 @property {String} user.password The user's encrypted password
 @property {Date} user.created the user's date of creation
 @property {Array} user.posts the user's title
 */

const userModel = require('../models/User');

/** 
 Gets user with specific ID
 @param {User._id}
 @returns {User[]}
 */
const getUser = id => userModel.find({});

/**
 Inserts a new user into the Database
 @param {User}
 @returns {User}
 */
const createUser = payload => userModel.create(payload);

/**
 Updates a user with specific Id
 @param {User}
 @returns {User}
 */
const updateUser = payload => userModel.findByIdAndUpdate(payload._id, payload);

/**
 Deletes a user with specific Id
 @param {User.id}
 @returns {null}
 */
const deleteUser = id => userModel.findByIdAndDelete(id);

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser
};
