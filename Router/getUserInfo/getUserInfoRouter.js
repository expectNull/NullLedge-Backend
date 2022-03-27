var express = require("express");
var router = express.Router();
const { getUserTok, getUserNm } = require("./getUser");
const { logger } = require("../../Log/DefLogger");
const { send } = require("../../sendEmail/sending");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(`------getUserInfoRouter---start-- : ${ip}`);

    if (info.user === undefined) {
      // mypage로 들어옴 TOK로 정보 확인.
      res.json(await getUserTok(info.token));
    } else {
      res.json(await getUserNm(info.user));
    }
  } catch (e) {
    logger.error(`------getUserInfoRouter---error-- : ${ip}\n ${e}`);
    send(
      "hyunsoo99kim@gmail.com",
      `[Err : Whyrano] getUserInfoRouter error`,
      "",
    );
    send("qudgnl0422@naver.com", `[Err : Whyrano] getUserInfoRouter error`, "");
    send(
      "shinhyoung26@gmail.com",
      `[Err : Whyrano] getUserInfoRouter error`,
      "",
    );
  } finally {
    res.end();
    logger.info(`------getUserInfoRouter---end-- : ${ip}`);
    return;
  }
});

module.exports = router;
