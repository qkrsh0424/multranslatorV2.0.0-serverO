const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const hbs = require('express-handlebars');

app.set('view engine', 'hbs'); // 1
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultView: 'default',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
}));
app.use(express.static(__dirname + '/public'));

//bodyParser load
const bodyParser = require('body-parser');

//bodyParser setting
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// get translate api
const translateAPI = require(__dirname + '/api/translate');

app.use('/api', translateAPI);

// 개인정보 처리정책
app.get('/privacy_policy', function (req, res) {
    res.sendFile(__dirname + '/public/privacy/Multranslator_privacy.html');
});

app.get('/', function (req, res) {
    // res.sendFile(__dirname+'/public/index.html')
    res.render('components/index');
})

app.use(function(req, res, next){
    res.status(404).render('components/404error');
});

app.listen(function () {
    console.log('app is running on server');
})

module.exports = app;