var express = require("express");
var router = express.Router();
const getConnection = require("../db/database");
//라우터 초기설정

router.post("/", async (req, res) => {
  try {
    const { sendReq } = req.body;
    var sql =
      "INSERT INTO commitlog(username, id, content, stu_username, token) VALUES(?,?,?,?,?) ON DUPLICATE KEY UPDATE content = (?)";
    // sql 명령어이다. ?에 param 배열의 값들이 하나씩 들어간다.
    var param = [
      sendReq.admin,
      id,
      content,
      sendReq.student,
      sendReq.token,
      content,
    ];
    // sql 명령어에 필요한 요소들이다.
    console.log(sendReq);
    // await getConnection(con => {
    //   con.query(sql, param, function (err, rows, fields) {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       //쿼리문 성공하면 할 코드 작성
    //     }
    //   });
    //   con.release();
    //   //Connection Pool에 con을 release해줘야한다.
    //   res.end();
    //   //res.end()를 하지 않으면, post작업을 한 번 더 실행하는 nodejs의 특성때문에 반드시 필요한 명령어이다.
    // });
  } catch (e) {
    console.log(e);
  }
  return;
});

module.exports = router;
