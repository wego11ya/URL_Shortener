// 引用 Express 與 Express 路由器
const express = require("express");
const router = express.Router();
const URL = require("../../models/URL");

// 定義首頁路由
router.get("/", (req, res) => {
  res.render("index");
});

// redirect shortURL to original URL
router.get("/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  URL.findOne({ shortURL })
    .then((url) => {
      res.redirect(url.originalURL);
    })
    .catch((err) => console.log(err));
});

// 匯出路由模組
module.exports = router;
