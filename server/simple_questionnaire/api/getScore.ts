const questions = require('../questions.json');
const trackEvent = require('../utils/trackEvent.ts');

const getScore = (req, res) => {
    const {answers, userName, isRevisit} = req.body;
    let score = 0;

    if (answers) {
         score = answers.filter(({id, answer}) => questions[id] !== undefined && questions[id].answer === answer).length;
    }

    res.json({score});

    if (!isRevisit) {
        trackEvent({event: 'user_completes_test', props: {
            userName,
            score,
        }});
    }

}

module.exports = { getScore };