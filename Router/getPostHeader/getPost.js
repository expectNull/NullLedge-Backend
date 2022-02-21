const pool = require("../../database/database");
const getLike = require("../getPost/getLikes");
const timeConvert = require("../timeConverter");

async function getItem(item, id) {
  let post_id = item.POST_ID;

  let ret = {
    post_nm: item.POST_NM,
    post_ymd: timeConvert(item.POST_YMD),
    post_tags: item.POST_TAGS_NM,
    content: item.CONTENT,
    view_cnt: item.VIEW_CNT,
    like_cnt: await getLike(id),
    user_nm: item.USER_NICK_NM,
    np_amt: item.NULLPOINT_ANT,
  };

  return ret;
}

async function getPost(id) {
  // type_gb = 0으로 질문글 확인, order by를 통해 최신글 부터
  var sql = `select POST_NM, POST_YMD, POST_TAGS_NM, CONTENT, VIEW_CNT, USER_NICK_NM, NULLPOINT_AMT
  from POST_TB join USER_TB on POST_TB.USER_ID = USER_TB.USER_ID
   where post_ID = ${id};`;
  let ret = [];

  let connection = await pool.getConnection(async conn => conn);
  let [rows, col] = await connection.query(sql);

  ret.push(await getItem(rows[0], id));

  connection.release();

  return ret;
}

module.exports = getPost;
