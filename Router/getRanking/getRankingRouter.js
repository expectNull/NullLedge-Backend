var express = require("express");
var router = express.Router();
const { getRanking } = require("./getRanking");
const { logger } = require("../../Log/DefLogger");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    logger.info(`------getRanking---start-- : ${ip}`);

    res.json(await getRanking());
  } catch (e) {
    logger.error(`------getRanking---error-- : ${ip}\n ${e}`);
  } finally {
    res.end();
    logger.info(`------getRanking---end-- : ${ip}\n`);
    return;
  }
});

module.exports = router;
