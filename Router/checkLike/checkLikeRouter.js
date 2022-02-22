var express = require("express");
var router = express.Router();
const checkLike = require("./checkLike");

router.post("/", async (req, res) => {
  try {
    console.log("------checkLike---start--");
    const info = req.body;
    console.log(info);

    res.json(await checkLike(info.post_id, info.user_id));
  } catch (e) {
    console.log(e);
  } finally {
    res.end();
    console.log("------checkLike--end--\n");
    return;
  }
});

module.exports = router;
