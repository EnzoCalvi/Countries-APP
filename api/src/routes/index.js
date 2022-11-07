const { Router } = require("express");
const router = Router();

const countryRoute = require("./country");
const activityRoute = require("./activity");

router.get("/", (req, res) => {
  res.status(200).json({ msg: "Server home" });
});

router.use("/countries", countryRoute);
router.use("/activity", activityRoute);

module.exports = router;
