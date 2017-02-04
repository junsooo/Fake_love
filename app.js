const axios = require('axios');
const normalize = require('./analyzer/normalize');
const textMap = require('./emotionText');
const qs = require('qs');

module.exports = (express, analyzer) => {
    express.post('/response', (req, res) => {
        const { message } = req.body;

        Promise.all([
            normalize(message),
            axios.post(
                'http://192.168.43.7:5230',
                qs.stringify({ message: message })
            )
        ]).then((values) => {
            let [normalizedText, { data: response }] = values;

            let emotion = analyzer.classify(normalizedText)[0];
            let emotionText = '';
                
            if (emotion) {
                let arr = textMap[emotion];
                let randIndex = Math.floor(Math.random() * 3);
                
                emotionText = ' ' + arr[randIndex];
            }

            res.json(response + emotionText);
        }).catch(() => {
            res.json('문장 형태로 입력해 줘!');
        });
    })
};