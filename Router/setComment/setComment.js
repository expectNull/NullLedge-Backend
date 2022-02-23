const pool = require("../../database/database");
const getProblemId = require("../setReply/getProblemId");

async function setComment(info) {
  var ProId = await getProblemId(info.parent_post_id);
  var sql = `INSERT INTO POST_TB(PROBLEM_ID, USER_ID, TYPE_GB, POST_YMD, CONTENT, PARENT_POST_ID) 
  VALUES(${ProId}, ${info.user_id}, ${info.type_gb}, 
      "${new Date().toISOString().split(".")[0]}", "${info.comment}", ${
    info.parent_post_id
  });`;
  console.log(sql);

  let connection = await pool.getConnection(async conn => conn);
  await connection.query(sql);

  connection.release();
}

module.exports = setComment;
