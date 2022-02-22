const pool = require("../../database/database");
const timeConvert = require("../timeConverter");

async function getItem(item) {
  let ret = {
    post_ymd: timeConvert(item.POST_YMD),
    content: item.CONTENT,
    user_nm: item.USER_NICK_NM,
  };

  return ret;
}

async function getCommentItem(id) {
  var sql = `select POST_YMD, CONTENT, USER_NICK_NM
  from POST_TB join USER_TB on POST_TB.USER_ID = USER_TB.USER_ID
  where post_id = ${id};`;

  let connection = await pool.getConnection(async conn => conn);
  let [rows, col] = await connection.query(sql);

  connection.release();

  return await getItem(rows[0]);
}

module.exports = getCommentItem;
