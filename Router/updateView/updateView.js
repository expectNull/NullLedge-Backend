const pool = require("../../database/database");

async function updateView(post) {
  var sql = `update POST_TB 
  set VIEW_CNT = VIEW_CNT + 1 
  where POST_ID = ?;`;
  let params = post;

  let connection = await pool.getConnection(async conn => conn);
  let [rows, col] = await connection.query(sql, params);

  connection.release();
}

module.exports = updateView;
