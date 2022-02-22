var express = require("express");
var router = express.Router();
const getPost = require("./getPost");

router.post("/", async (req, res) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    console.log("------getHeadRouter---start--");
    console.log(ip);

    let post_id = req.query.id;
    const ret = await getPost(post_id);

    res.json(ret);
  } catch (e) {
    console.log(e);
  } finally {
    res.end();
    console.log("------getHeadRouter--end--\n");
    return;
  }
});

module.exports = router;
