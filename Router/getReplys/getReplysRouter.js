var express = require("express");
var router = express.Router();
const getReplys = require("./getReplys");
const { logger } = require("../../Log/DefLogger");
const { send } = require("../../sendEmail/sending");
const checkPost = require("../checkPost");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(`------getReplyRouter---start-- : ${ip}`);

    if ((await checkPost(info.post_id)) === 0) {
      logger.info(`------getReplyRouter---id undefined-- : ${ip}`);
      res.json({ err: "post doesn't exist" });
      res.end();
      return;
    }

    res.json(await getReplys(info.post_id));
  } catch (e) {
    logger.error(`------getReplyRouter---error-- : ${ip}\n ${e}`);
    send("hyunsoo99kim@gmail.com", `[Err : Whyrano] getReplyRouter error`, "");
    send("qudgnl0422@naver.com", `[Err : Whyrano] getReplyRouter error`, "");
    send("shinhyoung26@gmail.com", `[Err : Whyrano] getReplyRouter error`, "");
  } finally {
    res.end();
    logger.info(`------getReplyRouter---end-- : ${ip}`);
    return;
  }
});

module.exports = router;
