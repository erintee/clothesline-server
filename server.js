require('dotenv').config();
const cors = require('cors');

const express = require('express');
const app = express();

const itemRouter = require('./routes/item-routes');
const closetRouter = require('./routes/closet-routes');

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use(express.static('./public'));

app.use('/items', itemRouter);
app.use('/closets', closetRouter);

app.listen(PORT, () => {
    console.log(`🐙 Server is running on ${PORT}`)
})