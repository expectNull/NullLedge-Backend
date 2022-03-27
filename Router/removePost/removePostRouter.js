var express = require("express");
var router = express.Router();
const removePost = require("./removePost");
const { logger } = require("../../Log/DefLogger");
const { send } = require("../../sendEmail/sending");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(`------removePost---start-- : ${ip}`);

    await removePost(info.post_id);
  } catch (e) {
    logger.error(`------removePost---error-- : ${ip}\n ${e}`);
    send("hyunsoo99kim@gmail.com", `[Err : Whyrano] removePost error`, "");
    send("qudgnl0422@naver.com", `[Err : Whyrano] removePost error`, "");
    send("shinhyoung26@gmail.com", `[Err : Whyrano] removePost error`, "");
  } finally {
    res.end();
    logger.info(`------removePost---end-- : ${ip}`);
    return;
  }
});

module.exports = router;
