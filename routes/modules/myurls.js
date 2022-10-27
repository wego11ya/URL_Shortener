// 引用 Express 與 Express 路由器
const express = require("express");
const router = express.Router();
const URL = require("../../models/URL");

router.get("/", (req, res) => {
  URL.find()
    .lean()
    .then((urls) => res.render("myurls", { urls }))
    .catch((err) => console.log(err));
});

// 匯出路由模組
module.exports = router;
