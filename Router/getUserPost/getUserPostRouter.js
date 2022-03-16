var express = require("express");
var router = express.Router();
const getUserPost = require("./getUserPost");

router.post("/", async (req, res) => {
  try {
    console.log("------getUserAsk, ReplyRouter---start--");
    const info = req.body;

    console.log(info);
    res.json(await getUserPost(info.user_id, info.type));
  } catch (e) {
    console.log(e);
  } finally {
    res.end();
    console.log("------getUserAsk, ReplyRouter--end--\n");
    return;
  }
});

module.exports = router;
