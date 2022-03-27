var express = require("express");
var router = express.Router();
const setComment = require("../setComment/setComment");
const { logger } = require("../../Log/DefLogger");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(`------setComment---start-- : ${ip}\n ${JSON.stringify(info)}`);

    res.send(await setComment(info));
  } catch (e) {
    logger.error(`------setComment---error-- : ${ip}\n ${e}`);
  } finally {
    res.end();
    logger.info(`------setComment---end-- : ${ip}\n`);
    return;
  }
});

module.exports = router;
