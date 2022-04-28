const pool = require("../../database/database");

async function getAllTag() {
  var sql = `SELECT TAG_NM, COUNT(*) as CNT 
  FROM NULLLEDGE.TAG_TB 
  where USER_ID = -1
  group by TAG_NM;`;
  let ret = [];

  let connection = await pool.getConnection(async conn => conn);
  let [rows, col] = await connection.query(sql);

  connection.release();

  for (let i = 0; i < rows.length; i++) {
    ret.push({
      tag_nm: rows[i].TAG_NM,
      cnt: rows[i].CNT,
    });
  }

  console.log(ret);
  return ret;
}

module.exports = getAllTag;
