require('dotenv').config();
const cors = require('cors');
const multer = require('multer');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

const itemRouter = require('./routes/item-routes');
const userRouter = require('./routes/user-routes');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/items', itemRouter);
app.use('/api/users', userRouter);

app.listen(PORT, () => {
    console.log(`🐙 Server is running on ${PORT}`)
})