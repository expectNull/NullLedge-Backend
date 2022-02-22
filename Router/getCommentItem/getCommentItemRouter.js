var express = require("express");
var router = express.Router();
const getCommentItem = require("./getCommentItem");

router.post("/", async (req, res) => {
  try {
    console.log("------getCommentItemRouter---start--");
    const info = req.body;
    console.log(info);

    res.json(await getCommentItem(info.post_id));
  } catch (e) {
    console.log(e);
  } finally {
    res.end();
    console.log("------getCommentItemRouter--end--\n");
    return;
  }
});

module.exports = router;
