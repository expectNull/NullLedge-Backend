var express = require("express");
var router = express.Router();
const checkEmail = require("./checkEmail");
const checkNm = require("./checkNm");
const setRegister = require("./setRegister");
const { logger } = require("../../Log/DefLogger");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(`------setRegister---start-- : ${ip}\n ${info}`);

    // Email 중복 여부 판단
    if (await checkEmail(info.email)) {
      logger.info(`------setRegister---sameEmail-- : ${ip}`);
      res.json({ error: "email" });
      res.end();
      return;
    }

    // 이미 이름이 존재하는 지 확인.
    if (await checkNm(info.nm)) {
      logger.info(`------setRegister---sameNm-- : ${ip}`);
      res.json({ error: "닉네임" });
      res.end();
      return;
    }

    await setRegister(info);
    res.json({ success: 1 });
  } catch (e) {
    logger.error(`------setRegister---error-- : ${ip}\n ${e}`);
  } finally {
    res.end();
    logger.info(`------setRegister---end-- : ${ip}\n`);
    return;
  }
});

module.exports = router;
