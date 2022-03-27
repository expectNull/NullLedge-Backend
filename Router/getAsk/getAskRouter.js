var express = require("express");
var router = express.Router();
const getAsk = require("./getAsk");
const { logger } = require("../../Log/DefLogger");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(
      `------getAskRouter---start-- : ${ip} \n ${JSON.stringify(info)}`,
    );

    const ret = await getAsk(info.post_id);
    res.json(ret);
  } catch (e) {
    logger.error(`------getAskRouter---error-- : ${ip} \n ${e}`);
  } finally {
    res.end();
    logger.info(`------getAskRouter---end-- : ${ip} \n`);
    return;
  }
});

module.exports = router;
