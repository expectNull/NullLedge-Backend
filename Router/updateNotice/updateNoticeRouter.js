var express = require("express");
var router = express.Router();
const updateNotice = require("./updateNotice");
const { logger } = require("../../Log/DefLogger");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(`------updateNotice---start-- : ${ip}`);

    await updateNotice(info.post_id);
  } catch (e) {
    logger.error(`------updateNotice---error-- : ${ip}\n ${e}`);
  } finally {
    res.end();
    logger.info(`------updateNotice---end-- : ${ip}`);
    return;
  }
});

module.exports = router;
