var express = require("express");
var router = express.Router();
const getPostTag = require("./getPostTag");
const { logger } = require("../../Log/DefLogger");
const { send } = require("../../sendEmail/sending");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(`------getPostTag---start-- : ${ip}`);

    res.json(await getPostTag(info.post_id));
  } catch (e) {
    logger.error(`------getPostTag---error-- : ${ip}\n ${e}`);
    send("hyunsoo99kim@gmail.com", `[Err : Whyrano] checkLike error`, "");
    send("qudgnl0422@naver.com", `[Err : Whyrano] checkLike error`, "");
    send("shinhyoung26@gmail.com", `[Err : Whyrano] checkLike error`, "");
  } finally {
    res.end();
    logger.info(`------getPostTag---end-- : ${ip}`);
    return;
  }
});

module.exports = router;
