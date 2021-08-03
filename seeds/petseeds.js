const { Pet } = require("../models");

const petdata = [
  {
    name: "Luna",
    animal: "Dog",
    breed: "Labrador",
    age: 1,
  },
  {
    name: "Larry",
    animal: "Dog",
    breed: "Chow Chow",
    age: 8,
  },
  {
    name: "Toby",
    animal: "Cat",
    breed: "Mixed",
    age: 5,
  },
];

const seedPets = () => Pet.bulkCreate(petdata);
module.exports = seedPets;
