var express = require("express");
var router = express.Router();
const getUserPost = require("./getUserPost");
const getParentPost = require("./getParentPost");

router.post("/", async (req, res) => {
  try {
    console.log("------getUserAsk, ReplyRouter---start--");
    const info = req.body;

    console.log(info);
    if (info.type === 0) {
      res.json(await getUserPost(info.user_id, info.type));
    } else {
      res.json(await getParentPost(info.user_id, info.type));
    }
  } catch (e) {
    console.log(e);
  } finally {
    res.end();
    console.log("------getUserAsk, ReplyRouter--end--\n");
    return;
  }
});

module.exports = router;
