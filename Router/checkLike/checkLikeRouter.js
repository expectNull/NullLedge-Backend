var express = require("express");
var router = express.Router();
const checkLike = require("./checkLike");
const { logger } = require("../../Log/DefLogger");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  try {
    const info = req.body;

    logger.info(`------checkLike---start-- : ${ip} \n ${JSON.stringify(info)}`);

    res.json(await checkLike(info.post_id, info.user_id));
  } catch (e) {
    logger.error(`------checkLike---start-- : ${ip} \n ${e}`);
  } finally {
    res.end();
    logger.info(`------checkLike---end-- : ${ip} \n`);
    return;
  }
});

module.exports = router;
