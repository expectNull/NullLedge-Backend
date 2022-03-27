var express = require("express");
var router = express.Router();
const { getUserTok, getUserNm } = require("./getUser");
const { logger } = require("../../Log/DefLogger");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(
      `------getUserInfoRouter---start-- : ${ip}\n ${JSON.stringify(info)}`,
    );

    if (info.user === undefined) {
      // mypage로 들어옴 TOK로 정보 확인.
      res.json(await getUserTok(info.token));
    } else {
      res.json(await getUserNm(info.user));
    }
  } catch (e) {
    logger.error(`------getUserInfoRouter---error-- : ${ip}\n ${e}`);
  } finally {
    res.end();
    logger.info(`------getUserInfoRouter---end-- : ${ip}\n`);
    return;
  }
});

module.exports = router;
