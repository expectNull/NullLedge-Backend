var express = require("express");
var router = express.Router();
const pool = require("../../database/database");
//라우터 초기설정

router.post("/", async (req, res) => {
  try {
    const info = req.body;
    let connection = await pool.getConnection(async conn => conn);
    var sql = `INSERT INTO POST_TB(PROBLEM_ID, USER_ID, TYPE_GB, POST_NM, 
        POST_YMD, POST_TAGS_NM, CONTENT, VIEW_CNT)
      VALUES(?, ?, ?, ?,
        ?, ?, ?, 0);`;

    // date는 new Date().toISOString().split(".")[0]로 나타내면 timezone을 분리해서 가져올 수 있다.
    // mySQL 내에서는 영국을 기준으로 시간이 정해져 있어서 이거 수정해야 할듯.

    var param = [
      info.problem_id,
      info.user_id,
      info.type_gb,
      info.title,
      new Date().toISOString().split(".")[0],
      info.tags,
      info.html_content,
    ];

    let today = new Date();
    console.log("------setPostRouter---start--");
    console.log(today);
    console.log(await connection.query(sql, param));
    console.log("------setPostRouter--end--");
    console.log(moment().format("YYYY-MM-DD HH:mm:ss"));

    res.end();
    connection.release();
  } catch (e) {
    res.send(e);
    console.log(e);
  }

  return;
});

module.exports = router;
