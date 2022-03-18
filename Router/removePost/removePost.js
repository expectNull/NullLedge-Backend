const pool = require("../../database/database");

async function removePost(post_id) {
  // type_gb = 0으로 질문글 확인, order by를 통해 최신글 부터
  var sql = [
    `delete from LIKE_LOG_TB WHERE POST_ID = ?;`,
    `delete from TAG_TB WHERE POST_ID = ?;`,
    `delete from POST_TB WHERE POST_ID = ?;`,
  ];

  let params = [post_id];

  let connection = await pool.getConnection(async conn => conn);

  for (let i = 0; i < sql.length; i++) {
    let [rows, col] = await connection.query(sql[i], params);
  }

  connection.release();
}

module.exports = removePost;
