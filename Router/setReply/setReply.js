const pool = require("../../database/database");
const getProblemId = require("./getProblemId");

async function setReply(info) {
  var ProId = await getProblemId(info.parent_post_id);
  info.html_content = info.html_content.replace(/"/gi, '\\"');
  var sql = `INSERT INTO POST_TB(PROBLEM_ID, USER_ID, TYPE_GB, POST_YMD, CONTENT, PARENT_POST_ID) 
  VALUES(${ProId}, ${info.user_id}, ${info.type_gb}, 
      "${new Date().toISOString().split(".")[0]}", "${info.html_content}", ${
    info.parent_post_id
  });`;
  // var sql = `INSERT INTO POST_TB(PROBLEM_ID, USER_ID, TYPE_GB, POST_YMD, CONTENT, PARENT_POST_ID, POST_TAGS_NM, VIEW_CNT)
  // VALUES(${ProId}, ${info.user_id}, ${info.type_gb},
  //     "${new Date().toISOString().split(".")[0]}", "${info.html_content}", ${
  //   info.parent_post_id
  // }, "tags", -1);`;
  console.log(sql);

  let connection = await pool.getConnection(async conn => conn);
  await connection.query(sql);

  connection.release();
}

module.exports = setReply;
