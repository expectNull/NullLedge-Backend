var express = require("express");
var router = express.Router();
const setPost = require("./setPost");
const setTag = require("./setTag");
const getPostId = require("./getPostId");
const { getUserId } = require("../getUserId");
const { logger } = require("../../Log/DefLogger");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(`------setPostRouter---start-- : ${ip}`);

    // token == salt_mail로 ID 가져오기.
    info.user_token = req.cookies["_KEN"];
    info.user_id = await getUserId(info.user_token);

    await setPost(info);
    let post = await getPostId(info.user_id);
    await setTag(info.tags, post);
  } catch (e) {
    res.send(e);
    logger.error(`------setPostRouter---error-- : ${ip}\n ${e}`);
  } finally {
    res.end();
    logger.info(`------removeCookie---end-- : ${ip}`);
    return;
  }
});

module.exports = router;
