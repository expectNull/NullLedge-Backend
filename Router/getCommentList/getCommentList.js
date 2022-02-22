const pool = require("../../database/database");
const timeConvert = require("../timeConverter");

async function getCommentList(id) {
  var sql = `select POST_ID
  from POST_TB join USER_TB on POST_TB.USER_ID = USER_TB.USER_ID
  where parent_post_id = ${id} and type_gb = 2;`;
  let ret = [];

  let connection = await pool.getConnection(async conn => conn);
  let [rows, col] = await connection.query(sql);

  for (let i = 0; i < rows.length; i++) {
    ret.push(rows[i].POST_ID);
  }

  connection.release();

  return ret;
}

module.exports = getCommentList;
