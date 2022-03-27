var express = require("express");
var router = express.Router();
const pool = require("../../database/database");
const checkLike = require("./checkLike");
const initLike = require("./InitLike");
const { logger } = require("../../Log/DefLogger");

router.post("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const info = req.body;
    logger.info(
      `------setLikeInit---start-- : ${ip}\n ${JSON.stringify(info)}`,
    );

    // 이미 Like Log가 존재하는 지 확인.
    if (await checkLike(info.post_id, info.user_id)) {
      logger.info(`------setLikeInit---LikeExist-- : ${ip}\n`);
      res.end();
      return;
    }

    let connection = await pool.getConnection(async conn => conn);
    connection.release();

    // 새로운 Like Log 만들기.
    initLike(info.post_id, info.user_id);
  } catch (e) {
    logger.error(`------setLikeInit---error-- : ${ip}\n ${e}`);
  } finally {
    res.end();

    logger.info(`------setLikeInit---end-- : ${ip}\n`);
    return;
  }
});

module.exports = router;
