const pool = require("../../database/database");

async function getPostByTag(value) {
  var sql = `SELECT POST_ID 
  FROM NULLLEDGE.TAG_TB 
  where TAG_NM = ?;`;
  let params = value;
  let ret = [];

  let connection = await pool.getConnection(async conn => conn);
  let [rows, col] = await connection.query(sql, params);

  connection.release();

  for (let i = 0; i < rows.length; i++) {
    ret.push(rows[i].POST_ID);
  }

  return ret;
}

module.exports = getPostByTag;
