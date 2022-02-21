var express = require("express");
var router = express.Router();
const getPost = require("./getPost");

router.post("/", async (req, res) => {
  try {
    let post_id = req.query.id;
    const ret = await getPost(post_id);

    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    let today = new Date();
    console.log("------getHeadRouter---start--");
    console.log(ip);
    console.log(today);
    console.log("------getHeadRouter--end--");

    res.json(ret);
    res.end();
  } catch (e) {
    console.log(e);
  }

  return;
});

module.exports = router;
