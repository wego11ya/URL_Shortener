// 載入 express 並建構應用程式伺服器
const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const URL = require("./models/URL");
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

app.post("/URL", (req, res) => {
  const originalURL = req.body.originalURL;
  URL.create({ originalURL })
    .then(() => res.redirect("/result"))
    .catch((error) => console.log(error));
});

app.get("/result", (req, res) => {
  res.render("result");
});

// 設定 port 3000
app.listen(3000, () => {
  console.log("App is running on http://localhost:3000");
});
