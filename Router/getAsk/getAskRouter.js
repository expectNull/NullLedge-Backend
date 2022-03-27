var express = require("express");
var router = express.Router();
const getAsk = require("./getAsk");
const { logger } = require("../../Log/DefLogger");
const { send } = require("../../sendEmail/sending");
const checkPost = require("../checkPost");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(`------getAskRouter---start-- : ${ip}`);

    if ((await checkPost(info.post_id)) === 0) {
      logger.info(`------getAskRouter---id undefined-- : ${ip}`);
      res.json({ err: "post doesn't exist" });
      res.end();
      return;
    }

    const ret = await getAsk(info.post_id);
    res.json(ret);
  } catch (e) {
    logger.error(`------getAskRouter---error-- : ${ip} \n ${e}`);
    send("hyunsoo99kim@gmail.com", `[Err : Whyrano] getAskRouter error`, "");
    send("qudgnl0422@naver.com", `[Err : Whyrano] getAskRouter error`, "");
    send("shinhyoung26@gmail.com", `[Err : Whyrano] getAskRouter error`, "");
  } finally {
    res.end();
    logger.info(`------getAskRouter---end-- : ${ip}`);
    return;
  }
});

module.exports = router;
