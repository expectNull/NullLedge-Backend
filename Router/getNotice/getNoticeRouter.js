var express = require("express");
var router = express.Router();
const { getUserPost } = require("./getNotice");
const { logger } = require("../../Log/DefLogger");
const { send } = require("../../sendEmail/sending");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(`------getNotice---start-- : ${ip}`);

    res.json(await getUserPost(info.mail));
  } catch (e) {
    logger.error(`------getNotice---error-- : ${ip}\n ${e}`);
    send("hyunsoo99kim@gmail.com", `[Err : Whyrano] checkLike error`, "");
    send("qudgnl0422@naver.com", `[Err : Whyrano] checkLike error`, "");
    send("shinhyoung26@gmail.com", `[Err : Whyrano] checkLike error`, "");
  } finally {
    res.end();
    logger.info(`------getNotice---end-- : ${ip}`);
    return;
  }
});

module.exports = router;
