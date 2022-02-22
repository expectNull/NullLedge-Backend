const pool = require("../../database/database");
const getAnswer = require("./getAnswers");
const getLike = require("../getLike/getLike");
const timeConvert = require("../timeConverter");

async function getItem(item) {
  let post_id = item.POST_ID;

  let ret = {
    post_id: post_id,
    ans_cnt: await getAnswer(post_id),
    like_cnt: await getLike(post_id),
    view_cnt: item.VIEW_CNT,
    post_nm: item.POST_NM,
    post_ymd: timeConvert(item.POST_YMD),
    user_nm: item.USER_NICK_NM,
    content: item.CONTENT,
  };
  return ret;
}

async function getPost() {
  // type_gb = 0으로 질문글 확인, order by를 통해 최신글 부터
  var sql = `select POST_ID, POST_NM, POST_YMD, VIEW_CNT, USER_NICK_NM, CONTENT
    from POST_TB join USER_TB on POST_TB.USER_ID = USER_TB.USER_ID
    where type_gb = 0
    order by POST_YMD DESC;`;
  let ret = [];

  let connection = await pool.getConnection(async conn => conn);
  let [rows, col] = await connection.query(sql);

  for (let i = 0; i < rows.length; i++) {
    ret.push(await getItem(rows[i]));
  }

  connection.release();

  return ret;
}

module.exports = getPost;
