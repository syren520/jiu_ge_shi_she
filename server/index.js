const {getQuestions} = require('./simple_questionnaire/api/getQuestions.ts')
const {getScore} = require('./simple_questionnaire/api/getScore.ts')
const {getAnalyticsData} = require('./simple_questionnaire/api/getAnalyticsData.ts')

const path = require('path');
const express = require("express");

const PORT = process.env.PORT || 3001;
const ANALYTIC_PORTAL_KEY = process.env.ANALYTIC_PORTAL_KEY || 'analytics';

const app = express();
app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.post("/api/simple-questionnaire/get-questions", getQuestions);
app.post("/api/simple-questionnaire/validate-questions", getScore);
app.get(`/api/simple-questionnaire/${ANALYTIC_PORTAL_KEY}`, getAnalyticsData);

app.get('/zgzu2023', function(req, res){
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.get('*', (req, res) => {
  res.redirect('/zgzu2023');
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
