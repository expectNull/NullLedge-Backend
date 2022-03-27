var express = require("express");
var router = express.Router();
const getLandingPost = require("./getLandingPost");
const { logger } = require("../../Log/DefLogger");
const { send } = require("../../sendEmail/sending");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(`------getLandingPostRouter---start-- : ${ip}`);

    const ret = await getLandingPost();
    res.json(ret);
  } catch (e) {
    logger.error(`------getLandingPostRouter---error-- : ${ip}\n ${e}`);
    send(
      "hyunsoo99kim@gmail.com",
      `[Err : Whyrano] getLandingPostRouter error`,
      "",
    );
    send(
      "qudgnl0422@naver.com",
      `[Err : Whyrano] getLandingPostRouter error`,
      "",
    );
    send(
      "shinhyoung26@gmail.com",
      `[Err : Whyrano] getLandingPostRouter error`,
      "",
    );
  } finally {
    res.end();
    logger.info(`------getLandingPostRouter---end-- : ${ip}`);
    return;
  }
});

module.exports = router;
