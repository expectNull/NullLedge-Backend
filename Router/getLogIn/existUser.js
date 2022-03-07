const pool = require("../../database/database");

async function existUser(email) {
  var sql = `select GMAIL_NM, SALT_NM, PASS_NM
  from USER_TB 
  where GMAIL_NM = ?;`;
  let params = email;

  let connection = await pool.getConnection(async conn => conn);
  let [rows, col] = await connection.query(sql, params);

  connection.release();

  return rows;
}

module.exports = existUser;
