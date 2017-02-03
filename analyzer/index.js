import async from 'async';
import fs from 'fs';
import limdu from 'limdu';
import normalize from './normalize';
import readline from 'readline';

module.exports = (emotions) => {
    const TextClassifier = limdu.classifiers.multilabel.BinaryRelevance.bind(0, {
        binaryClassifierType: limdu.classifiers.Winnow.bind(0, {retrain_count: 10})
    });

    const WordExtractor = function(input, features) {
        input.split(" ").forEach(function(word) {
            features[word] = 1;
        });
    };

    const classifier = new limdu.classifiers.EnhancedClassifier({
        classifierType: TextClassifier,
        featureExtractor: WordExtractor
    });

    const inputs = [];

    emotions.forEach((emotion) => {
        let _inputs = JSON.parse(
            fs.readFileSync(`./data/${emotion}.normalized.data`).toString()
        );

        _inputs.forEach((input) => {
            inputs.push({
                input: input,
                output: emotion
            });
        });
    })

    classifier.trainBatch(inputs);

    return classifier;
}