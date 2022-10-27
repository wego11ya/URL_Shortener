const express = require("express");
const exphbs = require("express-handlebars");
const routes = require("./routes");
require("./config/mongoose");

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const app = express();

app.engine("hbs", exphbs({ default: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
// setting body-parser
app.use(express.urlencoded({ extended: true }));
// 將request 導入路由器
app.use(routes);

// 設定 port 3000
app.listen(3000, () => {
  console.log("App is running on http://localhost:3000");
});
