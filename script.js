const express = require('express');
const app = express();
const { Client } = require('pg');

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

//Set up database connection
const client = new Client( {
  host: 'kayo_b',
  port: '',
  user: 'postgres',
  password: '1234',
  database: 'postgres'
})
console.log(client)
client.connect();
//webhook
app.post('/webhook', (req, res) => {
  console.log(req.body);
  const data = req.body;
  
  client.query('INSERT INTO risk_form_data (name, company, email, machinesite, address, city, country, telefone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [data.value1, data.value2,data.value3, data.value4, data.value5, data.value6, data.value7, data.value8])
  res.status(200).end();
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Webhook endpoint listening on port ${port}`);
});

// const express = require('express');
// const app = express();

// app.use(express.json());
// app.use(express.text());
// app.use(express.urlencoded({ extended: true }));

// app.post('/webhook', (req, res) => {
// console.log(req.body);
// res.status(200).end();

// });

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
// console.log(`Webhook endpoint listening on port ${port}`);

// });