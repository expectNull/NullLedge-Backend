var express = require("express");
var router = express.Router();
const removePost = require("./removePost");

router.post("/", async (req, res) => {
  try {
    console.log("------removePost---start--");
    const info = req.body;
    console.log(info);

    await removePost(info.post_id);
  } catch (e) {
    console.log(e);
  } finally {
    res.end();
    console.log("------removePost--end--\n");
    return;
  }
});

module.exports = router;
