var express = require("express");
var router = express.Router();
const getLike = require("./getLike");
const { logger } = require("../../Log/DefLogger");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(`------getLike---start-- : ${ip}`);

    res.json(await getLike(info.post_id));
  } catch (e) {
    console.log(e);
    logger.error(`------getLike---error-- : ${ip}\n ${e}`);
  } finally {
    res.end();
    logger.info(`------getLike---end-- : ${ip}`);
    return;
  }
});

module.exports = router;
