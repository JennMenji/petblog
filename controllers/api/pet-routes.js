const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Post, User, Pet } = require("../../models");

router.get("/", (req, res) => {
  console.log("======================");
  Pet.findAll({
    order: [["created_at", "DESC"]],
    // Query configuration
    attributes: [
      "id",
      "name",
      "type",
      "age",
      "created_at",
      "user_id",
      // [
      //   sequelize.literal(
      //     "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
      //   ),
      //   "vote_count",
      // ],
    ],
    include: [
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

router.post("/", (req, res) => {
  // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
  Pet.create({
    name: req.body.name,
    type: req.body.type,
    age: req.body.age,
    user_id: req.body.user_id,
  })
    .then((dbPetData) => res.json(dbPetData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  Pet.update(
    {
      name: req.body.name,
      type: req.body.type,
      age: req.body.age,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
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

router.delete("/:id", (req, res) => {
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

module.exports = router;
