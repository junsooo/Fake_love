const parse = require('./parse');
const save = require('./save');
const async = require('async');
const readline = require('readline');
const config = require('./config');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let filename, korean;

async.waterfall([
    (callback) => {
        reader.question('파일 이름은? ', (input) => {
            filename = input;
            callback(null);
        });
    },
    (callback) => {
        reader.question('검색할 키워드는? ', (input) => {
            korean = input;
            callback(null);
        });
    },
    (callback) => {
        parse(filename, korean, config, callback);
    },
    (callback) => {
        save(filename, callback);
    }
], (error, result) => {
    console.log('done!');
});
