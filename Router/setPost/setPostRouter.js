var express = require("express");
var router = express.Router();
const setPost = require("./setPost");
const setTag = require("./setTag");
const getPostId = require("./getPostId");

router.post("/", async (req, res) => {
  try {
    console.log("------setPostRouter---start--");
    const info = req.body;

    await setPost(info);
    let post = await getPostId(info.user_id);
    await setTag(info.tags, post);
  } catch (e) {
    res.send(e);
    console.log(e);
  } finally {
    res.end();
    console.log("------setPostRouter--end--");
    return;
  }
});

module.exports = router;
