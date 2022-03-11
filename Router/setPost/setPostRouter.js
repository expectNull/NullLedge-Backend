var express = require("express");
var router = express.Router();
const setPost = require("./setPost");
const setTag = require("./setTag");
const getPostId = require("./getPostId");
const getUserId = require("../getUserId");

router.post("/", async (req, res) => {
  try {
    console.log("------setPostRouter---start--");
    const info = req.body;
    // token == salt_mail로 ID 가져오기.
    info.user_id = await getUserId(info.user_token);

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
