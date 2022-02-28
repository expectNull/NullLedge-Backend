const pool = require("../../database/database");

async function getPostId(user) {
  var sql = `select post_id
  from POST_TB 
  where user_id = ? and type_gb = 0
  order by post_ymd desc;`;
  var params = user;

  let connection = await pool.getConnection(async conn => conn);
  let [rows, col] = await connection.query(sql, params);

  connection.release();
  console.log(rows);
  return rows[0].post_id;
}

module.exports = getPostId;
