const pool = require("../../database/database");

async function getAnswer(id) {
  var sql = `select count(*) as cnt 
  from POST_TB 
  where PARENT_POST_ID = ${id};`;
  let ret = 0;

  let connection = await pool.getConnection(async conn => conn);
  let [rows, col] = await connection.query(sql);

  ret += Number(rows[0].cnt);
  connection.release();

  return ret;
}

module.exports = getAnswer;
