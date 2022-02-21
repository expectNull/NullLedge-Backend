var express = require("express");
var router = express.Router();
const pool = require("../../database/database");
const checkLike = require("./checkLike");
const initLike = require("./InitLike");

router.post("/", async (req, res) => {
  try {
    console.log("------setLikeInit---start--");
    const info = req.body;
    console.log(info);

    // 이미 Like Log가 존재하는 지 확인.
    if (await checkLike(info.post_id, info.user_id)) return;

    let connection = await pool.getConnection(async conn => conn);
    connection.release();

    // 새로운 Like Log 만들기.
    initLike(info.post_id, info.user_id);

    console.log("------setLikeInit--end--\n");
  } catch (e) {
    console.log(e);
  }

  return;
});

module.exports = router;
