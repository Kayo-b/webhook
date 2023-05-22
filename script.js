const express = require('express');
const app = express();
const { Client } = require('pg');

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

//Set up database connection
const client = new Client( {
  host: 'mouse.db.elephantsql.com',
  port: 5432,
  user: 'cyrahcct',
  password: 'W9f_HAWdmNSrjAB6xqyDTeqmuEr6eDaI',
  database: 'cyrahcct'
})
console.log(client)
client.connect();
//webhook
app.post('/webhook', (req, res) => {
  console.log(req.body);
  const data = req.body;
  
  client.query(`CREATE TABLE risk_form_data (
    id SERIAL PRIMARY KEY,
    name TEXT,
    company TEXT,
    email TEXT,
    machinesite TEXT,
    address TEXT,
    city TEXT,
    country TEXT,
    telefone TEXT
  )`, (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Table created successfully');
    }
  });
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