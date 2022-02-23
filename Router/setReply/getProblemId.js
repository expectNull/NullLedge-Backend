const pool = require("../../database/database");

async function getProblemId(parent_id) {
  var sql = `SELECT PROBLEM_ID as ProId FROM POST_TB WHERE POST_ID = ${parent_id}`;
  let connection = await pool.getConnection(async conn => conn);
  let [rows, col] = await connection.query(sql);
  let ret = rows[0].ProId;
  connection.release();

  return ret;
}

module.exports = getProblemId;
