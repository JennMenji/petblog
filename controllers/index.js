const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");
const newpetroutes = require("./newpet-routes");

router.use("/api", apiRoutes);

router.use("/", homeRoutes);

router.use("/newpet", newpetroutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
