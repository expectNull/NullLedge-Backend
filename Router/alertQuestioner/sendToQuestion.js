const send = require("../../sendEmail/sending");

async function sendToQuestion(questioner) {
  let title = `Whyrano : 질문에 답변이 달렸습니다.`;
  let htmls = ``;

  await send(questioner, title, htmls);
}

module.exports = sendToQuestion;
