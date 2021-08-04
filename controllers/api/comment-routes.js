const router = require("express").Router();
const { User, Pet, Comment } = require("../../models");

router.get("/", (req, res) => {
  Comment.findAll({
    attributes: ["id", "comment_text"],
    include: [
      {
        model: User,
        attributes: ["id", "username"],
      },
      {
        model: Pet,
        attributes: ["id", "name"],
      },
    ],
  })
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status.json(500).json(err);
    });
});

router.post("/", (req, res) => {
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      pet_id: req.body.pet_id,
      // use the id from the session
      user_id: req.session.user_id,
    })
      .then((dbCommentData) => res.json(dbCommentData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

router.delete("/:id", (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res.status(404).json({ message: "No comment found with this id." });
        return;
      }
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
