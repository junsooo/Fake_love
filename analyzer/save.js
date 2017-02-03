const normalize = require('./normalize');
const fs = require('fs');

module.exports = (filename, callback) => {
    let arr = JSON.parse(
        fs.readFileSync(
            __dirname + `./data/${filename}.data`
        ).toString()
    );

    let promises = [];
    let texts = [];
    let i = 1;

    arr.forEach((tweet) => {
        promises.push(
            normalize(tweet.text)
                .then((text) => {
                    texts.push(text);
                })
        );
    });

    Promise.all(promises)
        .then(() => {
            fs.appendFileSync(`./data/${filename}.normalized.data`, JSON.stringify(texts))
            callback();
        });
};