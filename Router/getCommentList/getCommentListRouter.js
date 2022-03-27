var express = require("express");
var router = express.Router();
const getCommentList = require("./getCommentList");
const { logger } = require("../../Log/DefLogger");
const { send } = require("../../sendEmail/sending");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(`------getCommentListRouter---start-- : ${ip}`);

    res.json(await getCommentList(info.post_id));
  } catch (e) {
    logger.info(`------getCommentListRouter---error-- : ${ip}\n ${e}`);
    send(
      "hyunsoo99kim@gmail.com",
      `[Err : Whyrano] getCommentListRouter error`,
      "",
    );
    send(
      "qudgnl0422@naver.com",
      `[Err : Whyrano] getCommentListRouter error`,
      "",
    );
    send(
      "shinhyoung26@gmail.com",
      `[Err : Whyrano] getCommentListRouter error`,
      "",
    );
  } finally {
    res.end();
    logger.info(`------getCommentListRouter---end-- : ${ip}`);
    return;
  }
});

module.exports = router;
