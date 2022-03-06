const pool = require("../../database/database");

async function getEmail(user) {
  var sql = `SELECT GMAIL_NM 
  FROM nullledge.user_tb
  where user_id = ?;`;
  let params = user;

  let connection = await pool.getConnection(async conn => conn);
  let [rows, col] = await connection.query(sql, params);

  connection.release();

  return rows[0].GMAIL_NM;
}

module.exports = getEmail;
