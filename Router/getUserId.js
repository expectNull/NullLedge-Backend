const pool = require("../database/database");

async function getUserId(token) {
  var sql = `select USER_ID, USER_NICK_NM
  from USER_TB 
  where SALT_MAIL_NM = ?;`;
  var params = token;

  let connection = await pool.getConnection(async conn => conn);
  let [rows, col] = await connection.query(sql, params);

  connection.release();

  return rows[0].USER_ID;
}

async function getUserNm(token) {
  var sql = `select USER_NICK_NM
  from USER_TB 
  where SALT_MAIL_NM = ?;`;
  var params = token;

  let connection = await pool.getConnection(async conn => conn);
  let [rows, col] = await connection.query(sql, params);

  connection.release();

  return rows[0].USER_NICK_NM;
}

module.exports = { getUserId, getUserNm };
