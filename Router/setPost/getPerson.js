const pool = require("../../database/database");

async function getPerson(tag, user_id) {
  var sql = `SELECT GMAIL_NM 
  FROM TAG_TB JOIN USER_TB ON TAG_TB.USER_ID = USER_TB.USER_ID
  WHERE TAG_NM = ? AND TAG_TB.USER_ID != -1 AND TAG_TB.USER_ID != ?
  ORDER BY RAND();`;
  let params = [tag, user_id];

  let connection = await pool.getConnection(async conn => conn);
  let [rows, col] = await connection.query(sql, params);

  connection.release();

  return rows[0];
}

module.exports = getPerson;
