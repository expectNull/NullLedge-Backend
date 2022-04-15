var express = require("express");
var router = express.Router();
const checkEmail = require("./checkEmail");
const checkNm = require("./checkNm");
const setRegister = require("./setRegister");
const setTag = require("./setTag");
const { logger } = require("../../Log/DefLogger");
const { send } = require("../../sendEmail/sending");
const { getUserId } = require("../getUserId");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(`------setRegister---start-- : ${ip}`);

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

    let ret = await setRegister(info);
    let id = await getUserId(ret);

    await setTag(info.tags, id);

    res.json({ success: 1 });
  } catch (e) {
    logger.error(`------setRegister---error-- : ${ip}\n ${e}`);
    send("hyunsoo99kim@gmail.com", `[Err : Whyrano] setRegister error`, "");
    send("qudgnl0422@naver.com", `[Err : Whyrano] setRegister error`, "");
    send("shinhyoung26@gmail.com", `[Err : Whyrano] setRegister error`, "");
  } finally {
    res.end();
    logger.info(`------setRegister---end-- : ${ip}`);
    return;
  }
});

module.exports = router;
