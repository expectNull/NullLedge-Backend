var express = require("express");
var router = express.Router();
const checkUser = require("./checkUser");
const { logger } = require("../../Log/DefLogger");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(`------checkUser---start-- : ${ip}\n ${JSON.stringify(info)}`);

    res.json({ _KEN: await checkUser(info.post_id) });
  } catch (e) {
    logger.error(`------checkUser---error-- : ${ip}\n ${e}`);
  } finally {
    res.end();
    logger.info(`------checkUser---end-- : ${ip} \n`);
    return;
  }
});

module.exports = router;
