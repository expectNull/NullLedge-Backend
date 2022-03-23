const pool = require("../../database/database");

async function checkUser(post_id) {
  var sql = `
  SELECT SALT_MAIL_NM
  from POST_TB join USER_TB on POST_TB.USER_ID = USER_TB.USER_ID
  where POST_ID = ?;`;
  let params = post_id;

  let connection = await pool.getConnection(async conn => conn);
  let [rows, col] = await connection.query(sql, params);

  connection.release();

  return rows[0].SALT_MAIL_NM;
}

module.exports = checkUser;
