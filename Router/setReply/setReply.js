const pool = require("../../database/database");
const getProblemId = require("./getProblemId");
const { getUserId } = require("../getUserId");

async function setReply(info) {
  var ProId = await getProblemId(info.parent_post_id);
  info.html_content = info.html_content.replace(/"/gi, '\\"');
  var sql = `INSERT INTO POST_TB(PROBLEM_ID, USER_ID, TYPE_GB, CONTENT, PARENT_POST_ID, CHECK_GB) 
  VALUES(?, ?, ?, ?, ?, ?, ?);`;
  info.user_id = await getUserId(info.user_token);
  let params = [
    ProId,
    info.user_id,
    info.type_gb,
    // new Date().toISOString().split(".")[0],
    info.html_content,
    info.parent_post_id,
    2,
  ];

  let connection = await pool.getConnection(async conn => conn);
  await connection.query(sql, params);

  connection.release();
}

module.exports = setReply;
