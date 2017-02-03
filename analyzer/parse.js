const Twitter = require('twitter');
const async = require('async');
const fs = require('fs');

module.exports = (filename, korean, config, callback) => {
    const client = new Twitter(config);

    let max_id;
    const tweets = [];
    const iterate = [];

    for (let i = 0; i < 150; i++) {
        iterate.push(i);
    }

    const functions = iterate.map(() => {
        return (callback) => {
            client.get('search/tweets.json', { 
                q: korean,
                lang: 'ko-kr',
                max_id: max_id ? max_id - 1 : undefined,
                count: 50
            }, (error, obj) => {
                let { statuses, search_metadata } = obj;

                statuses.forEach(({ text }) => {
                    tweets.push({
                        text: text.replace(/@[^ ]+/, '')
                    });
                });

                max_id = statuses[statuses.length - 1].id;
                
                callback();
            })
        };
    });

    async.waterfall(functions, (err, result) => {
        fs.appendFileSync(__dirname + `/data/${filename}.data`, JSON.stringify(tweets));
        callback();
    });
}
