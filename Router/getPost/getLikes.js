const getConnection = require("../../database/database");

async function getLike(id) {
  var sql = `select count(*) as cnt from LIKE_LOG_TB where POST_ID = ${id};`;
  let ret = 0;

  await getConnection(con => {
    con.query(sql, function (err, rows, fields) {
      if (err) {
        console.log(err);
      }

      ret += rows.cnt;
    });
    con.release();
  });

  return ret;
}

module.exports = getLike;
