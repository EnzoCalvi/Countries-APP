const { Router } = require("express");
const { postActivity, getActivities } = require("../controllers/activities");
const router = Router();

router.post("/", postActivity);
router.get("/", getActivities);

module.exports = router;
