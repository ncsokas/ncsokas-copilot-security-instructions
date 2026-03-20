const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const apiRouter = require('./api');
const loginRouter = require('./login');
const userRouter = require('./user');
const uploadRouter = require('./upload');
const adminRouter = require('./admin');

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 30 * 24 * 60 * 60 * 1000,
    },
}));

app.use('/api', apiRouter);
app.use('/auth', loginRouter);
app.use('/users', userRouter);
app.use('/files', uploadRouter);
app.use('/admin', adminRouter);

app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message, stack: err.stack });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

module.exports = app;
