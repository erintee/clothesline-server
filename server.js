require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

const itemRouter = require('./routes/item-routes');
const userRouter = require('./routes/user-routes');
const authRouter = require('./routes/auth-routes');
// const dashRouter = require('./routes/dashboard-routes');
const requestsRouter = require('./routes/requests-routes');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/items', itemRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
// app.use('/api/dashboard', dashRouter);
app.use('/api/requests', requestsRouter)

app.listen(PORT, () => {
    console.log(`🐙 Server is running on ${PORT}`)
})