import express from "express";
import postRoute from './router/post';
import chatRoute from './router/chat';
import boardsRoute from './router/boards';
import cors from 'cors';

const app = express();
const port = process.env.PORT;
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3002',
  methods:['GET','POST','DELETE'],
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use('/api/post',postRoute)
app.use('/api/chat',chatRoute)
app.use('/api/boards',boardsRoute)

app.listen(port, () => console.log(`Listening on port ${port}`));
