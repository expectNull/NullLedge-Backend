var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const existUser = require("./existUser");
const { logger } = require("../../Log/DefLogger");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(`------getLogin---start-- : ${ip}`);

    // 동일한 email에 대해서 salt, hashedPw 가져오기.
    // bcrypt를 통해 동일하게 hash했을 떄를 비교.
    let ret = await existUser(info.email);

    if (ret.length === 0) {
      // 회원가입 하지 않은 유저인 경우
      logger.info(`------getLogin---userDoesn't Exist-- : ${ip}`);
      res.json({
        error: `유저가 존재하지 않습니다.\nemail형식을 확인해 주세요.`,
      });
      res.end();
      return;
    }

    let salt_mail = ret[0].SALT_MAIL_NM;
    let salt = ret[0].SALT_NM;
    let hashed = ret[0].PASS_NM;

    let input = await bcrypt.hash(info.pw, salt);

    if (hashed === input) {
      // 첫 번째 인자는 쿠키의 이름
      // 두 번째 인자는 쿠키의 값
      // 세 번째 인자는 옵션
      // 단위는 ms입니다. ( 1일 == 60 * 60 * 24 초 )
      // 웹 서버에서만 접근할 수 있도록 쿠키에 플래그를 지정하는 httpOnly 옵션을 추가했습니다.
      // 이것도 bcrypt로 암호화 해서 쿠키로 만들까???
      res.cookie("_KEN", salt_mail, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
        encode: String,
      });
      res.json({ success: 1 });
    } else {
      // 존재하지 않는 유저 혹은 비밀번호 틀림.
      logger.info(`------getLogin---Wrong password-- : ${ip}`);
      res.json({
        error: `유저가 존재하지 않습니다.\n 비밀번호를 확인해주세요.`,
      });
    }
  } catch (e) {
    logger.info(`------getLogin---error-- : ${ip}\n ${e}`);
  } finally {
    res.end();
    logger.info(`------getLogin---end-- : ${ip}`);
    return;
  }
});

module.exports = router;
