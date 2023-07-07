const express = require("express");
const app = express();
const port = 4000;
app.get('/get',(req, res) => {
  return res.send('Received a GET HTTP method');
})
app.listen(port, () => console.log(`Listening on port ${port}`));
