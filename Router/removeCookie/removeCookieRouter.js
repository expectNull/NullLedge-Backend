var express = require("express");
var router = express.Router();
const { logger } = require("../../Log/DefLogger");
const { send } = require("../../sendEmail/sending");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    logger.info(`------removeCookie---start-- : ${ip}`);
    res.clearCookie("_KEN");
  } catch (e) {
    logger.error(`------removeCookie---error-- : ${ip}\n ${e}`);
    send("hyunsoo99kim@gmail.com", `[Err : Whyrano] removeCookie error`, "");
    send("qudgnl0422@naver.com", `[Err : Whyrano] removeCookie error`, "");
    send("shinhyoung26@gmail.com", `[Err : Whyrano] removeCookie error`, "");
  } finally {
    res.end();
    logger.info(`------removeCookie---end-- : ${ip}`);
    return;
  }
});

module.exports = router;
