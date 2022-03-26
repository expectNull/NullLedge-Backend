const pool = require("../../database/database");

async function getItem(item) {
  let ret = {
    user_id: item.USER_ID,
    user_nm: item.USER_NICK_NM,
    user_np: item.NULLPOINT_AMT,
    user_sign: item.SIGNUP_YMD,
    user_status: item.STATUS_CONTENT,
    user_auth: item.AUTHORITHY_AMT,
  };
  return ret;
}

async function getUserAuth(user) {
  var sql = `
  select USER_ID, USER_NICK_NM, NULLPOINT_AMT, SIGNUP_YMD, STATUS_CONTENT, AUTHORITHY_AMT
  from USER_TB
  where SALT_MAIL_NM = ?;`;
  let params = user;

  let connection = await pool.getConnection(async conn => conn);
  let [rows, col] = await connection.query(sql, params);

  let ret = getItem(rows[0]);
  connection.release();

  return (await ret).user_auth;
}

module.exports = { getUserAuth };
