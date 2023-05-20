const express = require('express');
const app = express();

app.use(express.json());

app.post('/webhook', (req, res) => {
  console.log(req.body);
  res.status(200).end();
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Webhook endpoint listening on port ${port}`);
});