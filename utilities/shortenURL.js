function shortenURL() {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 5; i++) {
    result += characters[Math.floor(Math.random() * characters.length)];
  }
  return result;
}

module.exports = shortenURL;
