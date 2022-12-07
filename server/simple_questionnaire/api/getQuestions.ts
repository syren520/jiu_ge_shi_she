const questions = require('../questions.json');

const getQuestions = (req, res) => {
  const questionsToReturn = Object.values(questions).map((question) => {
    return {
      ...question,
      answer: null
    }
  });

  res.json({questions: questionsToReturn});
};

module.exports = { getQuestions };
