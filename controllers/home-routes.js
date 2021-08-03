const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment, Pet } = require("../models");



router.get("/",  (req, res) => {
  Pet.findAll({
    attributes: ["id", "name", "age", "animal",
    "breed", "user_id"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      const pets = dbPostData.map((pet) => pet.get({ plain: true }));
      console.log(req.session);
      // pass a single post object into the homepage template

      console.log(pets)
      res.render("homepage", { pets, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.get("/pet/:id", (req, res) => {
  Pet.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "name",
      "animal",
      "breed",
      "age",
      "created_at",
      "user_id",
    ],
    include: [
      {
        model: User,
        attributes: ["id", "username"],
      },
    ],
  })
    .then((dbPetData) => {
      if (!dbPetData) {
        res.status(404).json({ message: "No pet found with this id " });
        return;
      }

      const pet = dbPetData.get({ plain: true });

      res.render("single-pet", { pet, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render("signup");
});



module.exports = router;
