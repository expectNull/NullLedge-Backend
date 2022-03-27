var express = require("express");
var router = express.Router();
const { logger } = require("../../Log/DefLogger");
const { send } = require("../../sendEmail/sending");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  try {
    const info = req.cookies;

    logger.info(`------checkCookie---start-- : ${ip}}`);
    res.json({ _KEN: info._KEN });
  } catch (e) {
    logger.error(`------checkCookie---error-- : ${ip} \n${e}`);
    send("hyunsoo99kim@gmail.com", `[Err : Whyrano] checkCookie error`, "");
    send("qudgnl0422@naver.com", `[Err : Whyrano] checkCookie error`, "");
    send("shinhyoung26@gmail.com", `[Err : Whyrano] checkCookie error`, "");
  } finally {
    res.end();
    logger.info(`------checkCookie--end-- : ${ip}`);
    return;
  }
});

module.exports = router;
