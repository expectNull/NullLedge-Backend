const getConnection = require("../../database/database");
const getAnswer = require("./getAnswers");
const getLike = require("./getLikes");

// function getPost() {
var sql =
  "select POST_ID, TYPE_GB, POST_NM, POST_YMD, VIEW_CNT, USER_NICK_NM from POST_TB join USER_TB on POST_TB.USER_ID = USER_TB.USER_ID;";
let ret = [];

getConnection(con => {
  con.query(sql, function (err, rows, fields) {
    if (err) {
      //console.log(err);
    }
    rows.forEach(item => {
      let temp_type = item.TYPE_GB;
      if (temp_type !== 0) return;

      post_id = item.POST_ID;
      ret.push({
        post_id: post_id,
        ans_cnt: getAnswer(post_id).json(),
        like_cnt: getLike(post_id).json(),
        view_cnt: item.VIEW_CNT,
        post_nm: item.POST_NM,
        post_ymd: item.POST_YMD,
        user_nm: item.USER_NICK_NM,
      });
    });
    console.log(ret);
  });
  con.release();
});
// return ret;
// }

// console.log(getPost());
