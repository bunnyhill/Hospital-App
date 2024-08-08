const express = require('express');
const cors = require('cors');
const db = require('./db');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const app = express();

app.set('view engine', 'ejs');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const routes = require('./routes');
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running @http://localhost:${process.env.PORT}`);
});
