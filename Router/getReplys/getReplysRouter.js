var express = require("express");
var router = express.Router();
const getReplys = require("./getReplys");

router.post("/", async (req, res) => {
  try {
    console.log("------getReplyRouter---start--");
    const info = req.body;
    console.log(info);

    res.json(await getReplys(info.post_id));
  } catch (e) {
    console.log(e);
  } finally {
    res.end();
    console.log("------getReplyRouter--end--\n");
    return;
  }
});

module.exports = router;
