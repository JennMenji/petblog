const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");
const Pet = require("./Pet");

// NOT SURE IF WE WILL USE
const Vote = require('./Vote');



// create associations
User.hasMany(Post, {
  foreignKey: "user_id",
});

// reverse association
Post.belongsTo(User, {
  foreignKey: "user_id",
});

// Many-to-Many Associations
User.belongsToMany(Post, {
  through: Vote,
  as: "voted_posts",
  foreignKey: "user_id",
});

// Many-to-Many Associations
Post.belongsToMany(User, {
  through: Vote,
  as: "voted_posts",
  foreignKey: "post_id",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
});

User.hasMany(Pet, {
  foreignKey: "user_id"
})

Pet.belongsTo(User, {
  foreignKey: "user_id",
});

//NOT SURE ABOUT USING VOTE
Vote.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Vote.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

User.hasMany(Vote, {
  foreignKey: 'user_id'
});

Post.hasMany(Vote, {
  foreignKey: 'post_id'
});
module.exports = { User, Post, Vote, Comment, Pet };
