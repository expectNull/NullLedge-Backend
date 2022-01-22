const app = require('express')();
const bodyParser = require('body-parser');

const port = 8080;
const cors = require('cors');
const addProblemSetRouter = require('./addProblemSet/addProblemSetRouter');

app.use(cors());
app.use(bodyParser.json());

// app.use('/addproblemset', addProblemSetRouter);
app.use('/add', addProblemSetRouter);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
