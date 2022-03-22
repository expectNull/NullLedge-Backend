var express = require("express");
var router = express.Router();
const { getNotice, getUserPost } = require("./getNotice");

router.post("/", async (req, res) => {
  try {
    console.log("------getNotice---start--");
    const info = req.body;

    res.json(await getUserPost(info.mail));
  } catch (e) {
    console.log(e);
  } finally {
    res.end();
    console.log("------getNotice--end--\n");
    return;
  }
});

module.exports = router;
