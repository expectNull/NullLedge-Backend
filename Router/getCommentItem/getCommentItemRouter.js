var express = require("express");
var router = express.Router();
const getCommentItem = require("./getCommentItem");
const { logger } = require("../../Log/DefLogger");
const { send } = require("../../sendEmail/sending");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(`------getCommentItemRouter---start-- : ${ip}`);

    res.json(await getCommentItem(info.post_id));
  } catch (e) {
    logger.error(`------getCommentItemRouter---error-- : ${ip}\n ${e}`);
    send(
      "hyunsoo99kim@gmail.com",
      `[Err : Whyrano] getCommentItemRouter error`,
      "",
    );
    send(
      "qudgnl0422@naver.com",
      `[Err : Whyrano] getCommentItemRouter error`,
      "",
    );
    send(
      "shinhyoung26@gmail.com",
      `[Err : Whyrano] getCommentItemRouter error`,
      "",
    );
  } finally {
    res.end();
    logger.info(`------getCommentItemRouter---end-- : ${ip}`);
    return;
  }
});

module.exports = router;
