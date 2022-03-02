var express = require("express");
var router = express.Router();
const getPostTag = require("./getPostTag");

router.post("/", async (req, res) => {
  try {
    console.log("------getPostTag---start--");
    const info = req.body;

    res.json(await getPostTag(info.post_id));
  } catch (e) {
    console.log(e);
  } finally {
    res.end();
    console.log("------getPostTag--end--\n");
    return;
  }
});

module.exports = router;
