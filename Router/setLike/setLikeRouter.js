var express = require("express");
var router = express.Router();
const pool = require("../../database/database");
const updateLike = require("./updateLike");
const { logger } = require("../../Log/DefLogger");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(`------setLike---start-- : ${ip}\n ${JSON.stringify(info)}`);

    let connection = await pool.getConnection(async conn => conn);
    updateLike(info.post_id, info.user_id, info.value);
    connection.release();
  } catch (e) {
    logger.error(`------setLike---error-- : ${ip}\n ${e}`);
  } finally {
    res.end();
    logger.info(`------setLike---end-- : ${ip}\n`);
    return;
  }
});

module.exports = router;
