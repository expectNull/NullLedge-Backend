const pool = require("../../database/database");
const getProblemId = require("../setReply/getProblemId");
const { getUserId } = require("../getUserId");

async function setComment(info) {
  var ProId = 0;
  var sql = `INSERT INTO POST_TB(PROBLEM_ID, USER_ID, TYPE_GB, CONTENT, PARENT_POST_ID, CHECK_GB) 
  VALUES(?, ?, ?, ?, ?, ?);`;
  info.user_id = await getUserId(info.user_token);
  let params = [
    ProId,
    info.user_id,
    info.type_gb,
    info.comment,
    info.parent_post_id,
    2,
  ];

  let connection = await pool.getConnection(async conn => conn);
  await connection.query(sql, params);

  connection.release();
}

module.exports = setComment;
