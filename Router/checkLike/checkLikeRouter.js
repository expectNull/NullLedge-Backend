var express = require("express");
var router = express.Router();
const checkLike = require("./checkLike");
const { logger } = require("../../Log/DefLogger");
const { getUserId } = require("../getUserId");
const { send } = require("../../sendEmail/sending");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const info = req.body;
  try {
    logger.info(`------checkLike---start-- : ${ip}`);

    if (info.token === undefined) {
      logger.info(`------checkLike---not login-- : ${ip}`);
      res.json({ err: "need login" });
      res.end();
      return;
    }

    info.user_id = await getUserId(info.token);
    res.json(await checkLike(info.post_id, info.user_id));
  } catch (e) {
    logger.error(`------checkLike---error-- : ${ip} \n ${e}`);
    send("hyunsoo99kim@gmail.com", `[Err : Whyrano] checkLike error`, "");
    send("qudgnl0422@naver.com", `[Err : Whyrano] checkLike error`, "");
    send("shinhyoung26@gmail.com", `[Err : Whyrano] checkLike error`, "");
  } finally {
    res.end();
    logger.info(`------checkLike---end-- : ${ip}`);
    return;
  }
});

module.exports = router;
