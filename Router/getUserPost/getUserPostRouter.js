var express = require("express");
var router = express.Router();
const getUserPost = require("./getUserPost");
const getParentPost = require("./getParentPost");
const { logger } = require("../../Log/DefLogger");
const { send } = require("../../sendEmail/sending");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(`------getUserAsk, ReplyRouter---start-- : ${ip}`);

    if (info.type === 0) {
      res.json(await getUserPost(info.user_id, info.type));
    } else {
      res.json(await getParentPost(info.user_id, info.type));
    }
  } catch (e) {
    logger.error(`------getUserAsk, ReplyRouter---error-- : ${ip}\n ${e}`);
    send(
      "hyunsoo99kim@gmail.com",
      `[Err : Whyrano] getUserAsk, ReplyRouter error`,
      "",
    );
    send(
      "qudgnl0422@naver.com",
      `[Err : Whyrano] getUserAsk, ReplyRouter error`,
      "",
    );
    send(
      "shinhyoung26@gmail.com",
      `[Err : Whyrano] getUserAsk, ReplyRouter error`,
      "",
    );
  } finally {
    res.end();
    logger.info(`------getUserAsk, ReplyRouter---end-- : ${ip}`);
    return;
  }
});

module.exports = router;
