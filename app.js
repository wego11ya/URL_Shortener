// 載入 express 並建構應用程式伺服器
const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const URL = require("./models/URL");
const shortenURL = require("./utilities/shortenURL");
// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const app = express();
mongoose.connect(process.env.MONGODB_URI_URLShortener);

// 取得資料庫連線狀態
const db = mongoose.connection;
// 連線異常
db.on("error", () => {
  console.log("mongodb error!");
});
// 連線成功
db.once("open", () => {
  console.log("mongodb connected!");
});

app.engine("hbs", exphbs({ default: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
// setting body-parser
app.use(express.urlencoded({ extended: true }));
// 設定首頁路由
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/result", (req, res) => {
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

app.get("/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  URL.findOne({ shortURL })
    .then((url) => {
      res.redirect("url.shortURL");
    })
    .catch((err) => console.log(err));
});

// 設定 port 3000
app.listen(3000, () => {
  console.log("App is running on http://localhost:3000");
});
