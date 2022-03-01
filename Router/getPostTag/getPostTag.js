const pool = require("../../database/database");

async function getPostTag(post) {
  var sql = `select TAG_NM
  from TAG_TB
  where post_id = ?;`;
  let params = post;
  let ret = [];

  let connection = await pool.getConnection(async conn => conn);
  let [rows, col] = await connection.query(sql, params);

  connection.release();

  for (let i = 0; i < rows.length; i++) {
    ret.push(rows[i].TAG_NM);
  }

  return ret;
}

module.exports = getPostTag;
