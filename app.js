const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

//bodyParser load
const bodyParser = require('body-parser');

//bodyParser setting
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//구글 세팅
let googleConf = fs.readFileSync(__dirname+'/accesskey/googleconfig.json')
let parsingGoogleCONF = JSON.parse(googleConf);
var googleTranslate = require('google-translate')(parsingGoogleCONF.apikey);

//아마존 세팅
let AWS = require("aws-sdk");
AWS.config.loadFromPath(__dirname + '/accesskey/awsconfig.json');

//네이버 키값
let naverConf = fs.readFileSync(__dirname+'/accesskey/naverconfig.json');
let parsingNaverCONF = JSON.parse(naverConf);
app.post('/api/translate/google', async function (req, res) {

    let sourceText = req.body.sourceData.text;
    let sourceLanguage = req.body.sourceData.language;
    let targetLanguage = req.body.targetData.language;
    if (sourceLanguage === targetLanguage) {
        return res.json({ message: 'checkLanguage' })
    }
    googleTranslate.translate(sourceText, await languageExchange(sourceLanguage), await languageExchange(targetLanguage), function (err, translation) {
        // console.log(translation);
        if (err) {
            return res.json({ message: 'error' });
        }
        return res.json({
            message: 'success',
            targetData: req.body.targetData,
            translatedText: translation.translatedText,
            // originalText:translation.originalText
        })
    });

    function languageExchange(language) {
        switch (language) {
            case 'en':
                return 'en';
            case 'ko':
                return 'ko';
            case 'zh-CN':
                return 'zh';
        }
    }

})

app.post('/api/translate/papago', async function (req, res) {
    // quickStart();
    var request = require('request');
    let sourceText = req.body.sourceData.text;
    let sourceLanguage = req.body.sourceData.language;
    let targetLanguage = req.body.targetData.language;
    if (sourceLanguage === targetLanguage) {
        return res.json({ message: 'checkLanguage' })
    }
    var options = {
        'method': 'POST',
        'url': 'https://naveropenapi.apigw.ntruss.com/nmt/v1/translation',
        'headers': {
            'X-NCP-APIGW-API-KEY-ID': parsingNaverCONF.API_KEY_ID,
            'X-NCP-APIGW-API-KEY': parsingNaverCONF.API_KEY,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            'source': await languageExchange(sourceLanguage),
            'target': await languageExchange(targetLanguage),
            'text': sourceText
        }
    };
    request(options, function (error, response) {
        if (error) {
            console.log(error);
            return res.json({message:'error'});
        }
        var parsingData = JSON.parse(response.body);
        return res.json({
            message:'success',
            targetData: req.body.targetData,
            translatedText: parsingData.message.result.translatedText,
        })
    });

    function languageExchange(language) {
        switch (language) {
            case 'en':
                return 'en';
            case 'ko':
                return 'ko';
            case 'zh-CN':
                return 'zh-CN';
        }
    }
})

app.post('/api/translate/amazon', async function (req, res) {
    // quickStart();
    let sourceText = req.body.sourceData.text;
    let sourceLanguage = req.body.sourceData.language;
    let targetLanguage = req.body.targetData.language;
    if (sourceLanguage === targetLanguage) {
        return res.json({ message: 'checkLanguage' })
    }
    var translate = new AWS.Translate();
    var params = {
        SourceLanguageCode: await languageExchange(sourceLanguage), /* required */
        TargetLanguageCode: await languageExchange(targetLanguage), /* required */
        Text: sourceText, /* required */
    };
    translate.translateText(params, function (err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
            return res.json({ message: 'error' })
        }
        // console.log(data);           // successful response
        return res.json({
            message: 'success',
            targetData: req.body.targetData,
            translatedText: data.TranslatedText,
            // originalText:translation.originalText
        })
    });

    function languageExchange(language) {
        switch (language) {
            case 'en':
                return 'en';
            case 'ko':
                return 'ko';
            case 'zh-CN':
                return 'zh';
        }
    }

})

// Deploy Setting
app.use(express.static(path.join(__dirname, "../client/build")));

app.get('/*',function(req,res){
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(function () {
    console.log('app is running on server');
})

module.exports = app;