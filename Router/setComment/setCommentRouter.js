var express = require("express");
var router = express.Router();
const setComment = require("../setComment/setComment");
const { logger } = require("../../Log/DefLogger");
const { send } = require("../../sendEmail/sending");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(`------setComment---start-- : ${ip}`);
    res.send(await setComment(info));
  } catch (e) {
    logger.error(`------setComment---error-- : ${ip}\n ${e}`);
    send("hyunsoo99kim@gmail.com", `[Err : Whyrano] setComment error`, "");
    send("qudgnl0422@naver.com", `[Err : Whyrano] setComment error`, "");
    send("shinhyoung26@gmail.com", `[Err : Whyrano] setComment error`, "");
  } finally {
    res.end();
    logger.info(`------setComment---end-- : ${ip}`);
    return;
  }
});

module.exports = router;
