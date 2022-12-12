const questions = require('../questions.json');
const trackEvent = require('../utils/trackEvent.ts');

const getQuestions = (req, res) => {
  const {userName} = req.body;

  const questionsToReturn = Object.values(questions).map((question) => {
    return {
      ...question,
      answer: null
    }
  });

  res.json({questions: questionsToReturn});

  if (userName) {
    trackEvent({
      event: 'user_starts_test',
      props: {
        userName,
      }
    });
  }
};

module.exports = { getQuestions };
