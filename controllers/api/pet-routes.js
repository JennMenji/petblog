const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Post, User, Pet } = require("../../models");
const fs = require("fs");
const withAuth = require("../../utils/auth");


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

router.post("/", withAuth, (req, res) => {
console.log(req.session)
  Pet.create({
    name: req.body.name,
    animal: req.body.animal,
    breed: req.body.breed,
    age: req.body.age,
    user_id: req.session.user_id,
  //   dog_image: fs.readFileSync(
  //     "../../public/uploads" )
   })
    .then((dbPetData) => res.json(dbPetData)
    // .then(
    // fs.writeFileSync(
    //   __basedir + "../../public/uploads" + Pet.name + Pet.type,
    //   dbPetData.dog_image
    // ))
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.put("/:id", withAuth, (req, res) => {
  Pet.update(
    req.body,
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

module.exports = router;
