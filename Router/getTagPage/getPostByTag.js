const pool = require("../../database/database");

async function getPostByTag(value) {
  var sql = `SELECT TAG_TB.POST_ID 
  FROM TAG_TB join POST_TB on TAG_TB.POST_ID = POST_TB.POST_ID
  where TAG_NM = ?
  ORDER BY POST_YMD DESC;`;
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
