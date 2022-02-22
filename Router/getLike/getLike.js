const pool = require("../../database/database");

async function checkLike(post, user) {
  var sql = `select sum(VALUE_AMT) as CNT 
  from LIKE_LOG_TB 
  where post_id = ${post};`;

  let connection = await pool.getConnection(async conn => conn);
  let [rows, col] = await connection.query(sql);

  connection.release();

  return rows[0].CNT;
}

module.exports = checkLike;
