var express = require("express");
var router = express.Router();
const { getUserAuth } = require("./getUserAuth");
const { logger } = require("../../Log/DefLogger");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(
      `------getUserAuthRouter---start-- : ${ip}\n ${JSON.stringify(info)}`,
    );

    if (info.token === undefined) {
      res.json(0);
      res.end();
      return;
    }

    res.json(await getUserAuth(info.token));
  } catch (e) {
    logger.error(`------getUserAuthRouter---error-- : ${ip}\n ${e}`);
  } finally {
    res.end();
    logger.info(`------getUserAuthRouter---end-- : ${ip}\n`);
    return;
  }
});

module.exports = router;
