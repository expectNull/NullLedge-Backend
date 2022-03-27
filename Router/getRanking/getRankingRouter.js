var express = require("express");
var router = express.Router();
const { getRanking } = require("./getRanking");
const { logger } = require("../../Log/DefLogger");
const { send } = require("../../sendEmail/sending");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    logger.info(`------getRanking---start-- : ${ip}`);

    res.json(await getRanking());
  } catch (e) {
    logger.error(`------getRanking---error-- : ${ip}\n ${e}`);
    send("hyunsoo99kim@gmail.com", `[Err : Whyrano] getRanking error`, "");
    send("qudgnl0422@naver.com", `[Err : Whyrano] getRanking error`, "");
    send("shinhyoung26@gmail.com", `[Err : Whyrano] getRanking error`, "");
  } finally {
    res.end();
    logger.info(`------getRanking---end-- : ${ip}`);
    return;
  }
});

module.exports = router;
