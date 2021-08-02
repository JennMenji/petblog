const { Pet } = require("../models");

const petdata = [
  {
    name: "Luna",
    animal: "dog",
    age: 1,
  },
  {
    name: "Larry",
    animal: "dog",
    age: 5,
  },
];

const seedPets = () => Pet.bulkCreate(petdata);
module.exports = seedPets;
