var express = require('express');
var router = express.Router();

router.get("/", (request, response) => {
    response.send({ "Status": "Online" });
});

module.exports = router;