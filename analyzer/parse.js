const Twitter = require('twitter');
const async = require('async');
const fs = require('fs');

module.exports = (filename, korean, config, callback) => {
    const client = new Twitter(config);

    let next_results = `?q=${korean}&lang=ko-kr&count=50`;
    const tweets = [];
    const iterate = [];

    for (let i = 0; i < 150; i++) {
        iterate.push(i);
    }

    const functions = iterate.map(() => {
        return (callback) => {
            client.get(`search/tweets.json` + next_results, (error, obj) => {
                let { statuses, search_metadata } = obj;

                statuses.forEach(({ text }) => {
                    tweets.push({
                        text: text.replace(/@[^ ]+/, '')
                    });
                });

                next_results = search_metadata.next_results;
                
                callback();
            })
        };
    });

    async.waterfall(functions, (err, result) => {
        fs.appendFileSync(
            __dirname + `/data/${filename}.data`, JSON.stringify(tweets)
        );
        callback();
    });
}
