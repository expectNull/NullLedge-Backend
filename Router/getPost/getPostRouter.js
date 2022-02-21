var express = require("express");
var router = express.Router();
const getPost = require("./getPost");

router.post("/", async (req, res) => {
  try {
    const ret = await getPost();
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    let today = new Date();
    console.log("------getPostRouter---start--");
    console.log(ip);
    console.log(today);
    console.log("------getPostRouter--end--");
    res.json(ret);
    res.end();
  } catch (e) {
    console.log(e);
  }

  return;
});

module.exports = router;
