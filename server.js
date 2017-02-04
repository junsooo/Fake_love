const _analyzer = require('./analyzer');
const _express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const express = _express();

express.use(bodyParser.json());

const emotions = ['frustrated', 'happy', 'joyful', 'love', 'sad', 'scared'];
const analyzer = _analyzer(emotions);

const app = require('./app')(express, analyzer);

express.listen(8000, () => {
    console.log('fake-love server now ready!');
})