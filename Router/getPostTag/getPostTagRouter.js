var express = require("express");
var router = express.Router();
const getPostTag = require("./getPostTag");
const { logger } = require("../../Log/DefLogger");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(`------getPostTag---start-- : ${ip}\n ${JSON.stringify(info)}`);

    res.json(await getPostTag(info.post_id));
  } catch (e) {
    logger.error(`------getPostTag---error-- : ${ip}\n ${e}`);
  } finally {
    res.end();
    logger.info(`------getPostTag---end-- : ${ip}\n`);
    return;
  }
});

module.exports = router;
