const pool = require("../../database/database");

async function checkEmail(email) {
  var sql = `select USER_ID
  from USER_TB
  where GMAIL_NM = ?;`;
  let params = email;

  let connection = await pool.getConnection(async conn => conn);
  let [rows, col] = await connection.query(sql, params);

  connection.release();

  return rows.length;
}

module.exports = checkEmail;
