const pool = require("../../database/database");

async function getItem(item) {
  let ret = {
    post_id: item.POST_ID,
    content: item.CONTENT,
    user_nm: item.USER_NICK_NM,
    user_np: item.NULLPOINT_AMT,
    user_status: item.STATUS_CONTENT,
  };
  return ret;
}

async function getReplys(parent_id) {
  // like 수?? 업로드 날짜 수??
  var sql = `
  select POST_ID, CONTENT, USER_NICK_NM, NULLPOINT_AMT, STATUS_CONTENT
  from POST_TB join USER_TB on POST_TB.USER_ID = USER_TB.USER_ID
  where type_gb = 1 and parent_post_id = ?
  ORDER BY POST_YMD DESC;`;
  let params = parent_id;
  let ret = [];

  let connection = await pool.getConnection(async conn => conn);
  let [rows, col] = await connection.query(sql, params);

  for (let i = 0; i < rows.length; i++) {
    ret.push(await getItem(rows[i]));
  }

  connection.release();

  return ret;
}

module.exports = getReplys;
