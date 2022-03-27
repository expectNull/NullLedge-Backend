var express = require("express");
var router = express.Router();
const getCommentList = require("./getCommentList");
const { logger } = require("../../Log/DefLogger");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(
      `------getCommentListRouter---start-- : ${ip}\n ${JSON.stringify(info)}`,
    );

    res.json(await getCommentList(info.post_id));
  } catch (e) {
    logger.info(`------getCommentListRouter---error-- : ${ip}\n ${e}`);
  } finally {
    res.end();
    logger.info(`------getCommentListRouter---end-- : ${ip}\n`);
    return;
  }
});

module.exports = router;
