var express = require("express");
var router = express.Router();
const { logger } = require("../../Log/DefLogger");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  try {
    const info = req.cookies;

    logger.info(
      `------checkCookie---start-- : ${ip} \n ${JSON.stringify(info)}`,
    );
    res.json({ _KEN: info._KEN });
  } catch (e) {
    logger.error(`------checkCookie---error-- : ${ip} \n${e}`);
  } finally {
    res.end();
    logger.info(`------checkCookie--end-- : ${ip} \n`);
    return;
  }
});

module.exports = router;
