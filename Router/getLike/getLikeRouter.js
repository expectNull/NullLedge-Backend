var express = require("express");
var router = express.Router();
const getLike = require("./getLike");
const { logger } = require("../../Log/DefLogger");
const { send } = require("../../sendEmail/sending");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(`------getLike---start-- : ${ip}`);

    res.json(await getLike(info.post_id));
  } catch (e) {
    console.log(e);
    logger.error(`------getLike---error-- : ${ip}\n ${e}`);
    send("hyunsoo99kim@gmail.com", `[Err : Whyrano] getLike error`, "");
    send("qudgnl0422@naver.com", `[Err : Whyrano] getLike error`, "");
    send("shinhyoung26@gmail.com", `[Err : Whyrano] getLike error`, "");
  } finally {
    res.end();
    logger.info(`------getLike---end-- : ${ip}`);
    return;
  }
});

module.exports = router;
