var express = require("express");
var router = express.Router();
const { getUserAuth } = require("./getUserAuth");
const { logger } = require("../../Log/DefLogger");
const { send } = require("../../sendEmail/sending");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(`------getUserAuthRouter---start-- : ${ip}`);

    if (info.token === undefined) {
      res.json(0);
      res.end();
      return;
    }

    res.json(await getUserAuth(info.token));
  } catch (e) {
    logger.error(`------getUserAuthRouter---error-- : ${ip}\n ${e}`);
    send(
      "hyunsoo99kim@gmail.com",
      `[Err : Whyrano] getUserAuthRouter error`,
      "",
    );
    send("qudgnl0422@naver.com", `[Err : Whyrano] getUserAuthRouter error`, "");
    send(
      "shinhyoung26@gmail.com",
      `[Err : Whyrano] getUserAuthRouter error`,
      "",
    );
  } finally {
    res.end();
    logger.info(`------getUserAuthRouter---end-- : ${ip}`);
    return;
  }
});

module.exports = router;
