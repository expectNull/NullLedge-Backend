const pool = require("../../database/database");

async function initLike(post, user) {
  var sql = `insert into LIKE_LOG_TB 
  (USER_ID, POST_ID) 
  values (${user}, ${post});`;

  let connection = await pool.getConnection(async conn => conn);
  await connection.query(sql);

  connection.release();
}

module.exports = initLike;
