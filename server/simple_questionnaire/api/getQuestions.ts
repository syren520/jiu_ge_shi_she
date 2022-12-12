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

  if (userName) {
    trackEvent({
      event: 'user_starts_test',
      props: {
        userName,
      }
    });
  }


  res.json({questions: questionsToReturn});
};

module.exports = { getQuestions };
