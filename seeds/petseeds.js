const { Pet } = require("../models");

const petdata = [
  {
    name: "Luna",
    type: "dog",
    age: 1,
  },
  {
    name: "Larry",
    type: "dog",
    age: 5,
  },
];

const seedPets = () => Post.bulkCreate(petdata);
module.exports = seedPets;
