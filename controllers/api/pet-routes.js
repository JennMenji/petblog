const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Post, User, Comment, Pet } = require("../../models");
const fs = require("fs");
const withAuth = require("../../utils/auth");
const upload = require("../../middleware/upload");

router.get("/", (req, res) => {
  console.log("======================");
  Pet.findAll({
    order: [["created_at", "DESC"]],
    // Query configuration
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
        model: Comment,
        attributes: ["id", "comment_text", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["id", "username"],
      },
    ],
  })
    .then((dbPetData) => res.json(dbPetData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", withAuth, upload.single("file"), (req, res) => {
  console.log(req.file);

  Pet.create({
    name: req.body.name,
    animal: req.body.animal,
    breed: req.body.breed,
    age: req.body.age,
    user_id: req.session.user_id,

    dog_image: req.file.filename
  })
    .then((dbPetData) => {
    
      res.json(dbPetData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", withAuth, (req, res) => {
  Pet.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbPetData) => {
      if (!dbPetData) {
        res.status(404).json({ message: "No pet found with this id found" });
        return;
      }
      res.json(dbPetData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", withAuth, (req, res) => {
  Pet.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPetData) => {
      if (!dbPetData) {
        res.status(404).json({ message: "No pet found with this id." });
        return;
      }
      res.json(dbPetData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});



router.get("/:id", (req, res) => {
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
      "dog_image",
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

      res.json(dbPetData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
