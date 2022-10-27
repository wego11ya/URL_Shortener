const express = require("express");
const router = express.Router();
const home = require("./modules/home");
const result = require("./modules/result");
const myurls = require("./modules/myurls");

router.use("/result", result);
router.use("/myurls", myurls);
router.use("/", home);

module.exports = router;
