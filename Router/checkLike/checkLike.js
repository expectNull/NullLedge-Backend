const pool = require("../../database/database");

async function checkLike(post, user) {
  var sql = `select VALUE_AMT
  from LIKE_LOG_TB 
  where user_id = ? and post_id = ?;`;
  let params = [user, post];
  let ret = [];

  let connection = await pool.getConnection(async conn => conn);
  let [rows, col] = await connection.query(sql, params);

  connection.release();
  return rows[0].VALUE_AMT;
}

module.exports = checkLike;
