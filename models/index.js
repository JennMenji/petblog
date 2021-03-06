const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");
const Pet = require("./Pet");

// NOT SURE IF WE WILL USE
// // create associations
// User.hasMany(Post, {
//   foreignKey: "user_id",
// });

// // reverse association
// Post.belongsTo(User, {
//   foreignKey: "user_id",
// });

// Many-to-Many Associations
// User.belongsToMany(Comment, {
//   foreignKey: "user_id",
// });

// // Many-to-Many Associations
// Post.belongsToMany(User, {
//   foreignKey: "post_id",
// });

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(Pet, {
  foreignKey: "pet_id",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
});

Pet.hasMany(Comment, {
  foreignKey: "pet_id",
});

User.hasMany(Pet, {
  foreignKey: "user_id",
});

Pet.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Post, Comment, Pet };
