const pool = require("../../database/database");

async function getAnswer(id) {
  var sql = `select count(*) as cnt 
  from POST_TB 
  where PARENT_POST_ID = ${id} and type_gb = 1;`;

  let connection = await pool.getConnection(async conn => conn);
  let [rows, col] = await connection.query(sql);
  connection.release();

  return Number(rows[0].cnt);
}

module.exports = getAnswer;
