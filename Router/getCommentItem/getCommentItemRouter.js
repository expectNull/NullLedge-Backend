var express = require("express");
var router = express.Router();
const getCommentItem = require("./getCommentItem");
const { logger } = require("../../Log/DefLogger");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(`------getCommentItemRouter---start-- : ${ip}`);

    res.json(await getCommentItem(info.post_id));
  } catch (e) {
    logger.error(`------getCommentItemRouter---error-- : ${ip}\n ${e}`);
  } finally {
    res.end();
    logger.info(`------getCommentItemRouter---end-- : ${ip}`);
    return;
  }
});

module.exports = router;
