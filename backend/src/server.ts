import express from "express";
import postRoute from './router/post';
import chatRoute from './router/chat';
const app = express();
const port = 4001;
import cors from 'cors';
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:3002',
  methods:['GET','POST'],
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use('/api/post',postRoute)
app.use('/api/chat',chatRoute)
app.listen(port, () => console.log(`Listening on port ${port}`));
