var express = require('express');
var router = express.Router();

router.get('/q1', function (req, res) {
   let session = req.session;

      res.send(session.id);

  
});
router.post('/q1', function (req, res) {
   res.send('POST route on things.');
});

//export this router to use in our index.js
module.exports = router;