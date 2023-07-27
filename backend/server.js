const express = require("express");
const app = express();
const postRoute = require("./router/post");
const chatRoute = require("./router/chat");
const authRoute = require("./router/auth");
const port = 4000;
const cors = require('cors')
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:3002',
  methods:['GET','POST'],
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use('/api/post',postRoute)
app.use('/api/chat',chatRoute)
app.use('/api/auth',authRoute)
app.listen(port, () => console.log(`Listening on port ${port}`));
