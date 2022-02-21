function timeConvert(time) {
  let KST_Time = time;
  KST_Time.setHours(KST_Time.getHours() + 9);

  return JSON.stringify(KST_Time)
    .replace("T", " ")
    .replace('"', "")
    .split(".")[0];
}

module.exports = timeConvert;
