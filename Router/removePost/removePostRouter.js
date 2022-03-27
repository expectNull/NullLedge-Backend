var express = require("express");
var router = express.Router();
const removePost = require("./removePost");
const { logger } = require("../../Log/DefLogger");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(`------removePost---start-- : ${ip}\n ${JSON.stringify(info)}`);

    await removePost(info.post_id);
  } catch (e) {
    logger.error(`------removePost---error-- : ${ip}\n ${e}`);
  } finally {
    res.end();
    logger.info(`------removePost---end-- : ${ip}\n`);
    return;
  }
});

module.exports = router;
