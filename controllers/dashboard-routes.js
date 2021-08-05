const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment, Pet } = require("../models");
const withAuth = require('../utils/auth');

router.get("/", withAuth, (req, res) => {
    console.log (req.session.user_id);

    User.findOne({
      attributes: { exclude: ["password"] },
      where: {
        id: req.session.user_id,
      },
      include: [
        {
          model: Pet,
          attributes: ["id", "name", "animal","dog_image", "breed", "age"],
        },
      ],
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id " });
          return;
        }
  
        const user = dbUserData.get({ plain: true });
  
        res.render("user-profile", { user, loggedIn: req.session.loggedIn });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });


  router.get("/pets/:id", (req, res) => {
    Pet.findAll({
        where: {
            id: req.session.user_id,
          },
      attributes: [
        "id",
        "name",
        "age",
        "animal",
        "breed",
        "dog_image",
        "user_id",
      ],
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
  
        console.log(pets);
        res.render("dashboard", { pets, loggedIn: req.session.loggedIn });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

//To view a Pet Profile once you click on the Image
router.get("/", (req, res) => {
    Pet.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: [
        "id",
        "name",
        "animal",
        "breed",
        "age",
        "dog_image",
        "created_at",
        "user_id",
      ]
     
    })
      .then((dbPetData) => {
        if (!dbPetData) {
          res.status(404).json({ message: "No pet found with this id " });
          return;
        }
  
        const pets = dbPostData.map((pet) => pet.get({ plain: true }));
  
        res.render("user-profile", { pet, loggedIn: req.session.loggedIn });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });






  router.get("/user-profile",  (req, res) => {
    if (req.session.loggedIn) {
      res.render("user-profile");
      return;
    }
    else {
      res.redirect('/');
    }
  });

  module.exports = router;