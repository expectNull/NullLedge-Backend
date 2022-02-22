const pool = require("../../database/database");

async function updateLike(post, user, value) {
  var sql = `update LIKE_LOG_TB 
  SET VALUE_AMT = ${value}, LOG_YMD=NOW()
  where user_id = ${user} and post_id = ${post};`;

  let connection = await pool.getConnection(async conn => conn);
  await connection.query(sql);

  connection.release();
}

module.exports = updateLike;
