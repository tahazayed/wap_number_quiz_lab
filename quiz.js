const express = require('express');
const router = express.Router();
const Questions = require('./questions.js');
const questions = require('./questions.js');

router.get('/q/:id', function (req, res) {
   const id = req.params.id;
   if (id == 1) {
      req.session.score = 0;
      req.session.q1 = Number.NEGATIVE_INFINITY;
      req.session.q2 = Number.NEGATIVE_INFINITY;
      req.session.q3 = Number.NEGATIVE_INFINITY;
      req.session.q4 = Number.NEGATIVE_INFINITY;
      req.session.q5 = Number.NEGATIVE_INFINITY;
   }

   if (id >= 1 && id <= 5) {
      return  res.render('q_view', {
         score: calculateScore(req),
         question: Questions.questions[(id - 1)],
         id: req.params.id
      });
   }
   else {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end("404 Not Found");
   }

});

router.post('/q/:id', function (req, res) {
   const id = req.params.id;
   if (id >= 1 && id <= 4) {
      req.session['q' + id] = new Number(req.body.answer);
      const newId = Number(id) + 1;
      return res.redirect("/quiz/q/" + newId)
   }
   if (id == 5) {
      req.session.q5 = new Number(req.body.answer);
      return res.redirect('/quiz/result');
   }
   else {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end("404 Not Found");
   }
});


router.get('/result', function (req, res) {
   res.render('result_view', { score: calculateScore(req) });
});

function calculateScore(req) {
   let score = 0;

   for (let i = 0; i < 5; i++) {

      if (req.session['q' + (i + 1)] == questions.answers[i]) {
         score++;
      }
   }
   return score;
}
//export this router to use in our index.js
module.exports = router;