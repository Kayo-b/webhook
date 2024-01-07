require('dotenv').config()
const express = require('express');
const app = express();
const { Client } = require('pg');

//dotenv.config();
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

//Set up database connection
const client = new Client( {
  host: 'mouse.db.elephantsql.com',
  port: 5432,
  user: 'cyrahcct',
  password: process.env.ELSQLPASSWORD,
  database: 'cyrahcct'
})
console.log(client)
client.connect();

//webhook
app.post('/webhook', (req, res) => {
  console.log(req.body);
  const data = req.body;
  console.log(data.fields)
  console.log(data.fields.name)
  client.query(
    'INSERT INTO risk_form_data (name, company, email, machinesite, address, city, country, telefone, returncontact) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
    [
    data.fields.name.value,
    data.fields.company.value,
    data.fields.email.value, 
    data.fields.machinesite.value, 
    data.fields.address.value, 
    data.fields.city.value, 
    data.fields.country.value, 
    data.fields.telefone.value,
    data.fields.returncontact.value
  ]
  );
  res.status(200).end();

  app.get('/get', (req, res) => {
    res.status(200).send('Pong');
  });

  const pingHerokuApp = () => {
    setInterval(() => {
      fetch('https://risk-form.herokuapp.com/get');
    }, 25 * 60 * 1000);
  };

  pingHerokuApp();

});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Webhook endpoint listening on port ${port}`);
});
