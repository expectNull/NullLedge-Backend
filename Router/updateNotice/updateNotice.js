const pool = require("../../database/database");

async function updateNotice(post) {
  var sql = `UPDATE POST_TB 
    set CHECK_GB = 1
  where POST_ID=?;`;
  let params = post;

  let connection = await pool.getConnection(async conn => conn);
  let [rows, col] = await connection.query(sql, params);

  connection.release();
}

module.exports = updateNotice;
