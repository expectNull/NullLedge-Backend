const pool = require("../../database/database");

async function checkVisit(post) {
  var sql = ``;
  let params;

  let connection = await pool.getConnection(async conn => conn);
  let [rows, col] = await connection.query(sql, params);

  connection.release();
}

module.exports = checkVisit;