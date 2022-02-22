var express = require("express");
var router = express.Router();
const getCommentList = require("./getCommentList");

router.post("/", async (req, res) => {
  try {
    console.log("------getCommentListRouter---start--");
    const info = req.body;
    console.log(info);

    res.json(await getCommentList(info.post_id));
  } catch (e) {
    console.log(e);
  } finally {
    res.end();
    console.log("------getCommentListRouter--end--\n");
    return;
  }
});

module.exports = router;
