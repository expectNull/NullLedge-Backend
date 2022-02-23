var express = require("express");
var router = express.Router();
const pool = require("../../database/database");
//라우터 초기설정

router.post("/", async (req, res) => {
  try {
    console.log("------setPostRouter---start--");
    const info = req.body;

    let connection = await pool.getConnection(async conn => conn);
    var sql = `INSERT INTO POST_TB(PROBLEM_ID, USER_ID, TYPE_GB, POST_NM, 
        POST_YMD, POST_TAGS_NM, CONTENT, VIEW_CNT)
      VALUES(${info.problem_id}, ${info.user_id}, ${info.type_gb}, "${
      info.title
    }",
      "${new Date().toISOString().split(".")[0]}", "${info.tags}", "${
      info.html_content
    }", 0);`;
    console.log(await connection.query(sql));
    connection.release();
  } catch (e) {
    res.send(e);
    console.log(e);
  } finally {
    res.end();
    console.log("------setPostRouter--end--");
    return;
  }
});

module.exports = router;
