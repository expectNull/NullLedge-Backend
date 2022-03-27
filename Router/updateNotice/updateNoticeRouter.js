var express = require("express");
var router = express.Router();
const updateNotice = require("./updateNotice");
const { logger } = require("../../Log/DefLogger");
const { send } = require("../../sendEmail/sending");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(`------updateNotice---start-- : ${ip}`);

    await updateNotice(info.post_id);
  } catch (e) {
    logger.error(`------updateNotice---error-- : ${ip}\n ${e}`);
    send("hyunsoo99kim@gmail.com", `[Err : Whyrano] updateNotice error`, "");
    send("qudgnl0422@naver.com", `[Err : Whyrano] updateNotice error`, "");
    send("shinhyoung26@gmail.com", `[Err : Whyrano] updateNotice error`, "");
  } finally {
    res.end();
    logger.info(`------updateNotice---end-- : ${ip}`);
    return;
  }
});

module.exports = router;
