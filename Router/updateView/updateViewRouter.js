var express = require("express");
var router = express.Router();
const updateView = require("./updateView");
const checkVisit = require("./checkVisit");
const { logger } = require("../../Log/DefLogger");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(`------updateView---start-- : ${ip}`);

    // if checkVisit == true 이면 업데이트 x

    await updateView(info.post_id);
  } catch (e) {
    logger.error(`------updateView---error-- : ${ip}\n ${e}`);
  } finally {
    res.end();
    logger.info(`------updateView---end-- : ${ip}`);
    return;
  }
});

module.exports = router;
