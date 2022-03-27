var express = require("express");
var router = express.Router();
const getLandingPost = require("./getLandingPost");
const { logger } = require("../../Log/DefLogger");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(`------getLandingPostRouter---start-- : ${ip}`);

    const ret = await getLandingPost();
    res.json(ret);
  } catch (e) {
    logger.error(`------getLandingPostRouter---error-- : ${ip}\n ${e}`);
  } finally {
    res.end();
    logger.info(`------getLandingPostRouter---end-- : ${ip}`);
    return;
  }
});

module.exports = router;
