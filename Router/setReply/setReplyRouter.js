var express = require("express");
var router = express.Router();
const setReply = require("../setReply/setReply");
const { logger } = require("../../Log/DefLogger");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(`------setReply---start-- : ${ip}\n ${JSON.stringify(info)}`);
    info.user_token = req.cookies["_KEN"];

    res.send(await setReply(info));
  } catch (e) {
    logger.error(`------setReply---error-- : ${ip}\n ${e}`);
  } finally {
    res.end();
    logger.info(`------setReply---end-- : ${ip}\n`);
    return;
  }
});

module.exports = router;
