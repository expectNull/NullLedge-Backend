var express = require("express");
var router = express.Router();
const getReplys = require("./getReplys");
const { logger } = require("../../Log/DefLogger");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(
      `------getReplyRouter---start-- : ${ip}\n ${JSON.stringify(info)}`,
    );

    res.json(await getReplys(info.post_id));
  } catch (e) {
    logger.error(`------getReplyRouter---error-- : ${ip}\n ${e}`);
  } finally {
    res.end();
    logger.info(`------getReplyRouter---end-- : ${ip}\n`);
    return;
  }
});

module.exports = router;
