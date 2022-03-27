var express = require("express");
var router = express.Router();
const updateView = require("./updateView");
const { logger } = require("../../Log/DefLogger");
const { send } = require("../../sendEmail/sending");
const checkPost = require("../checkPost");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(`------updateView---start-- : ${ip}`);

    if ((await checkPost(info.post_id)) === 0) {
      logger.info(`------updateView---id undefined-- : ${ip}`);
      res.json({ err: "post doesn't exist" });
      res.end();
      return;
    }

    await updateView(info.post_id);
  } catch (e) {
    logger.error(`------updateView---error-- : ${ip}\n ${e}`);
    send("hyunsoo99kim@gmail.com", `[Err : Whyrano] updateView error`, "");
    send("qudgnl0422@naver.com", `[Err : Whyrano] updateView error`, "");
    send("shinhyoung26@gmail.com", `[Err : Whyrano] updateView error`, "");
  } finally {
    res.end();
    logger.info(`------updateView---end-- : ${ip}`);
    return;
  }
});

module.exports = router;
