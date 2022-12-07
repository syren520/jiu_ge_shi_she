const questions = require('../questions.json');

const getScore = (req, res) => {
    const {answers} = req.body;
    let score = 0;

    if (answers) {
         score = answers.filter(({id, answer}) => questions[id] !== undefined && questions[id].answer === answer).length;
    }

    res.json({score});

}

module.exports = { getScore };