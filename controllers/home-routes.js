const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment, Pet } = require("../models");

router.get("/", (req, res) => {
  Pet.findAll({
    attributes: ["id", "name", "age", "type", "user_id"],
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

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/newpet", (req, res) => {


  res.render("newpet");
});

module.exports = router;
