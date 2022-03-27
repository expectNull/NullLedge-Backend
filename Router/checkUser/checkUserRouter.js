var express = require("express");
var router = express.Router();
const checkUser = require("./checkUser");
const { logger } = require("../../Log/DefLogger");
const { send } = require("../../sendEmail/sending");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(`------checkUser---start-- : ${ip}`);

    if (info.post_id === undefined) {
      logger.info(`------checkUser---id undefined-- : ${ip}`);
      res.json({ err: "post_id is undefined" });
      res.end();
      return;
    }

    res.json({ _KEN: await checkUser(info.post_id) });
  } catch (e) {
    logger.error(`------checkUser---error-- : ${ip}\n ${e}`);
    send("hyunsoo99kim@gmail.com", `[Err : Whyrano] checkUser error`, "");
    send("qudgnl0422@naver.com", `[Err : Whyrano] checkUser error`, "");
    send("shinhyoung26@gmail.com", `[Err : Whyrano] checkUser error`, "");
  } finally {
    res.end();
    logger.info(`------checkUser---end-- : ${ip}`);
    return;
  }
});

module.exports = router;
