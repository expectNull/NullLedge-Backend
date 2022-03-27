const pool = require("../database/database");

async function getInfoEmail(post_id) {
  var sql = `select POST_NM, GMAIL_NM
  from POST_TB join USER_TB on POST_TB.USER_ID = USER_TB.USER_ID
  where post_id = ?;`;
  let params = [post_id];

  let connection = await pool.getConnection(async conn => conn);
  let [rows, col] = await connection.query(sql, params);

  connection.release();

  return rows[0];
}

module.exports = getInfoEmail;
