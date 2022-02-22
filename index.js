const app = require("express")();
const bodyParser = require("body-parser");

const port = 8080;
const cors = require("cors");
const setPostRouter = require("./Router/setPost/setPostRouter");
const setLikeRouter = require("./Router/setLike/setLikeRouter");
const setLikeInitRouter = require("./Router/setLike/setLikeInitRouter");
const getPostRouter = require("./Router/getPost/getPostRouter");
const getHeaderRouter = require("./Router/getPostHeader/getHeaderRouter");
const getLikeRouter = require("./Router/getLike/getLikeRouter");
const checkLikeRouter = require("./Router/checkLike/checkLikeRouter");

app.use(cors());
app.use(bodyParser.json());

app.use("/checkLike", checkLikeRouter);
app.use("/getPostead", getHeaderRouter);
app.use("/getpost", getPostRouter);
app.use("/getLike", getLikeRouter);
app.use("/setpost", setPostRouter);
app.use("/setLike", setLikeRouter);
app.use("/setLikeInit", setLikeInitRouter);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
