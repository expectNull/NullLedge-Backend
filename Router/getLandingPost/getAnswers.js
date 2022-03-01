const pool = require("../../database/database");

async function getAnswer(id) {
  var sql = `select count(*) as cnt 
  from POST_TB 
  where PARENT_POST_ID = ? and type_gb = 1;`;
  let params = id;

  let connection = await pool.getConnection(async conn => conn);
  let [rows, col] = await connection.query(sql, params);
  connection.release();

  return Number(rows[0].cnt);
}

module.exports = getAnswer;
