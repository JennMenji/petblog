// const seedUsers = require("./user-seeds");
const seedPets = require("./petseeds");
// const seedPosts = require(‘./post-seeds’);
// const seedComments = require(‘./comment-seeds’);
// const seedVotes = require(‘./vote-seeds’);
const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("--------------");
  // await seedUsers();
  // console.log("--------------");
  await seedPets();
  console.log("--------------");
  // await seedPosts();
  // console.log("--------------");
  // await seedComments();
  // console.log("--------------");
  // await seedVotes();
  // console.log("--------------");
  // process.exit(0);
};

seedAll();
