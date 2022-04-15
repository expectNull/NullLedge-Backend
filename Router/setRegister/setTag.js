const pool = require("../../database/database");

async function setTag(tags, user_id) {
  var sql = `INSERT INTO TAG_TB(TAG_NM, USER_ID)
  VALUES(?, ?);`;

  for (let i = 0; i < tags.length; i++) {
    let connection = await pool.getConnection(async conn => conn);

    let params = [tags[i], user_id];
    await connection.query(sql, params);

    connection.release();
  }
}

module.exports = setTag;
