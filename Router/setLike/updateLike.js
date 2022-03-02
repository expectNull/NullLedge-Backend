const pool = require("../../database/database");

async function updateLike(post, user, value) {
  var sql = `update LIKE_LOG_TB 
  SET VALUE_AMT = ?, LOG_YMD=NOW()
  where user_id = ? and post_id = ?;`;
  let params = [value, user, post];

  let connection = await pool.getConnection(async conn => conn);
  await connection.query(sql, params);

  connection.release();
}

module.exports = updateLike;
