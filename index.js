const app = require("express")();
const bodyParser = require("body-parser");

const port = 8080;
const cors = require("cors");
const setPostRouter = require("./Router/setPost/setPostRouter");
const setLikeRouter = require("./Router/setLike/setLikeRouter");
const setLikeInitRouter = require("./Router/setLike/setLikeInitRouter");
const getPostRouter = require("./Router/getPost/getPostRouter");
const getHeaderRouter = require("./Router/getPostHeader/getHeaderRouter");

app.use(cors());
app.use(bodyParser.json());

app.use("/getPostead", getHeaderRouter);
app.use("/getpost", getPostRouter);
app.use("/setpost", setPostRouter);
app.use("/setLike", setLikeRouter);
app.use("/setLikeInit", setLikeInitRouter);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
