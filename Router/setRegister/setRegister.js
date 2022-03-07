const pool = require("../../database/database");

async function setRegister(user) {
  var sql = `insert into USER_TB 
  (GMAIL_NM, PASS_NM, SALT_NM, USER_NICK_NM, STATUS_CONTENT) 
  values (?, ?, ?, ?, ?);`;
  let params = [user.email, user.hashed, user.salt, user.nm, user.status];

  let connection = await pool.getConnection(async conn => conn);
  await connection.query(sql, params);

  connection.release();
}

module.exports = setRegister;
