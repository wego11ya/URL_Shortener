// 引用 Express 與 Express 路由器
const express = require("express");
const router = express.Router();
const URL = require("../../models/URL");
const shortenURL = require("../../utilities/shortenURL");

router.post("/", (req, res) => {
  // 如果資料庫裡面已經有原本網址則回傳原本資料，若沒有則新增資料
  const originalURL = req.body.originalURL;
  const shortURL = shortenURL();

  URL.findOne({ originalURL })
    .then((url) => {
      return url ? url : URL.create({ originalURL, shortURL });
    })
    .then((url) => {
      res.render("result", {
        shortURL: url.shortURL,
        originalURL: url.originalURL,
      });
    })
    .catch((err) => console.log(err));
});

// 匯出路由模組
module.exports = router;
