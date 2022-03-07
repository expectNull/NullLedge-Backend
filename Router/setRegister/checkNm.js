const pool = require("../../database/database");

async function checkNm(nm) {
  var sql = `select USER_ID
  from USER_TB
  where USER_NICK_NM = ?;`;
  let params = nm;

  let connection = await pool.getConnection(async conn => conn);
  let [rows, col] = await connection.query(sql, params);

  connection.release();

  return rows.length;
}

module.exports = checkNm;
