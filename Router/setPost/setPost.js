const pool = require("../../database/database");

async function setPost(info) {
  info.html_content = info.html_content.replace(/"/gi, '\\"');
  var sql = `INSERT INTO POST_TB(PROBLEM_ID, USER_ID, TYPE_GB, POST_NM, CONTENT)
  VALUES(?, ?, ?, ?, ?);`;
  let params = [
    info.problem_id,
    info.user_id,
    info.type_gb,
    info.title,
    info.html_content,
  ];

  let connection = await pool.getConnection(async conn => conn);
  await connection.query(sql, params);

  connection.release();
}

module.exports = setPost;
