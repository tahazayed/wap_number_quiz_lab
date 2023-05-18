var express = require('express');
var router = express.Router();

router.get('/q1', function (req, res) {
   const session = req.session;
   if (session.id) {
      res.send(session.id);
   }
   res.send('GET route on things.');
});
router.post('/q1', function (req, res) {
   res.send('POST route on things.');
});

//export this router to use in our index.js
module.exports = router;