var express = require("express");
var router = express.Router();
const checkLike = require("./checkLike");
const initLike = require("./InitLike");
const { logger } = require("../../Log/DefLogger");
const { getUserId } = require("../getUserId");
const { send } = require("../../sendEmail/sending");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    info.user_id = await getUserId(info.token);

    logger.info(`------setLikeInit---start-- : ${ip}`);

    if (info.token === undefined) {
      logger.info(`------setLikeInit---not login-- : ${ip}`);
      res.json({ err: "need login" });
      res.end();
      return;
    }

    // 이미 Like Log가 존재하는 지 확인.
    if (await checkLike(info.post_id, info.user_id)) {
      logger.info(`------setLikeInit---LikeExist-- : ${ip}`);
      res.end();
      return;
    }

    // 새로운 Like Log 만들기.
    initLike(info.post_id, info.user_id);
  } catch (e) {
    logger.error(
      `------setLikeInit---error-- : ${ip}\n ${e} \n ${JSON.stringify(info)}`,
    );
    send("hyunsoo99kim@gmail.com", `[Err : Whyrano] setLikeInit error`, "");
    send("qudgnl0422@naver.com", `[Err : Whyrano] setLikeInit error`, "");
    send("shinhyoung26@gmail.com", `[Err : Whyrano] setLikeInit error`, "");
  } finally {
    res.end();

    logger.info(`------setLikeInit---end-- : ${ip}`);
    return;
  }
});

module.exports = router;
