const pool = require("../../database/database");
const getLike = require("../getLike/getLike");
const timeConvert = require("../timeConverter");

async function getItem(item, id) {
  let ret = {
    post_id: id,
    user_id: item.USER_ID,
    post_nm: item.POST_NM,
    post_ymd: timeConvert(item.POST_YMD),
    content: item.CONTENT,
    view_cnt: item.VIEW_CNT,
    like_cnt: await getLike(id),
    user_nm: item.USER_NICK_NM,
    user_np: item.NULLPOINT_AMT,
    user_status: item.STATUS_CONTENT,
  };

  return ret;
}

async function getAsk(id) {
  var sql = `select USER_TB.USER_ID, POST_NM, POST_YMD, CONTENT, 
  VIEW_CNT, USER_NICK_NM, NULLPOINT_AMT, STATUS_CONTENT
  from POST_TB join USER_TB on POST_TB.USER_ID = USER_TB.USER_ID
   where post_ID = ?;`;
  let params = id;
  let connection = await pool.getConnection(async conn => conn);
  let [rows, col] = await connection.query(sql, params);

  connection.release();

  return await getItem(rows[0], id);
}

module.exports = getAsk;
