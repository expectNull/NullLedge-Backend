var express = require("express");
var router = express.Router();
const getLandingPost = require("./getLandingPost");

router.post("/", async (req, res) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    console.log("------getPostRouter---start--");
    console.log(ip);

    const ret = await getLandingPost();
    res.json(ret);
  } catch (e) {
    console.log(e);
  } finally {
    res.end();
    console.log("------getPostRouter--end--");
    return;
  }
});

module.exports = router;
