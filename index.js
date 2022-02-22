const app = require("express")();
const bodyParser = require("body-parser");

const port = 8080;
const cors = require("cors");
const setPostRouter = require("./Router/setPost/setPostRouter");
const setLikeRouter = require("./Router/setLike/setLikeRouter");
const setLikeInitRouter = require("./Router/setLike/setLikeInitRouter");
const getLandingPostRouter = require("./Router/getLandingPost/getLandingPostRouter");
const getAskRouter = require("./Router/getAsk/getAskRouter");
const getLikeRouter = require("./Router/getLike/getLikeRouter");
const getCommentItemRouter = require("./Router/getCommentItem/getCommentItemRouter");
const getCommentListRouter = require("./Router/getCommentList/getCommentListRouter");
const getReplysRouter = require("./Router/getReplys/getReplysRouter");
const checkLikeRouter = require("./Router/checkLike/checkLikeRouter");

app.use(cors());
app.use(bodyParser.json());

app.use("/checkLike", checkLikeRouter);
app.use("/getAsk", getAskRouter);
app.use("/getCommentItem", getCommentItemRouter);
app.use("/getCommentList", getCommentListRouter);
app.use("/getLandingPost", getLandingPostRouter);
app.use("/getLike", getLikeRouter);
app.use("/getReplys", getReplysRouter);
app.use("/setpost", setPostRouter);
app.use("/setLike", setLikeRouter);
app.use("/setLikeInit", setLikeInitRouter);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
