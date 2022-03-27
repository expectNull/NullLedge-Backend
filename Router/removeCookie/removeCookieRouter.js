var express = require("express");
var router = express.Router();
const { logger } = require("../../Log/DefLogger");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    logger.info(`------removeCookie---start-- : ${ip}`);
    res.clearCookie("_KEN");
  } catch (e) {
    logger.error(`------removeCookie---error-- : ${ip}\n ${e}`);
  } finally {
    res.end();
    logger.info(`------removeCookie---end-- : ${ip}\n`);
    return;
  }
});

module.exports = router;
