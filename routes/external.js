var express = require('express');
var router = express.Router();

/* GET an external page. */
router.get('/linkedin', function (req, res, next) {
  res.redirect("https://www.linkedin.com/in/justin-a-smith-177b30ab");
  console.log("l");
});

router.get('/github', function (req, res, next) {
  res.redirect("https://github.com/Jsgtaj");
});

module.exports = router;
