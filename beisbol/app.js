const express = require('express');
const path = require('path');
require('dotenv').config();

const statsRouter = require('./routes/stats');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');

app.use('/', statsRouter);

const PORT = process.env.PORT;


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
