require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const authRouter = require('./routes/auth-routes');
const userRouter = require('./routes/user-routes');
const itemRouter = require('./routes/item-routes');
const requestsRouter = require('./routes/requests-routes');

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/items', itemRouter);
app.use('/api/requests', requestsRouter);

app.listen(PORT, () => {
    console.log(`🐙 Server is running on ${PORT}`)
})