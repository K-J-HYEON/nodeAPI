const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

app.set('port', process.env.PORT || 3000);

// localhost:3000/zerocho.png
// localhost:3000/about

// app.use('/', express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(cookieParser('zerochopassword'));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'zerochopassword',
    cookie: {
        httpOnly: true,
    },
}));



app.use('/', (req, res, next) => {
    if (req.session.id) {
        express.static(__dirname, 'public')(req, res, next)
    } else {
        next();
    }
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
    req.data // zerocho비번
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', (req, res) => {
    res.send('hello express!');
});

app.get('/category/Javascript', (req, res) => {
    res.send(`hello Javascript`);
}); 

app.get('/about', (req, res) => {
    res.send('hello express');
});

app.use((req, res, next) => {
    res.status(404).send('404지롱');
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(200).send('에러났다이. 근데 안알려줄끼다');
});

app.listen(app.get('port'), () => {
    console.log('익스프레스 서버 실행');
});