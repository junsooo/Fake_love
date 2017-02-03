const axios = require('axios');
const cheerio = require('cheerio');
const processor = require('node-twitter-korean-text');
const qs = require('qs');

module.exports = function (text) {
    return processor
            .normalize(text)
            .then((normalizedText) => {
                return processor.tokenize(normalizedText);
            })
            .then((tokens) => processor.stem(tokens))
            .then((stemmed) => processor.tokensToJsonArray(stemmed))
            .then((result) => {
                result = result
                    .filter((token) => {
                        return [
                            'Noun', 'ProperNoun',
                            'Verb', 'Adjective'
                        ].includes(token.koreanPos);
                    })
                    .map((res) => {
                        return res.text;
                    });

                return result.join(' ');
            });
};