var express = require('express');
const getMunicipalities = require('../../../functions/getMunicipalities');
var router = express.Router();

router.get("/", async (request, response) => {
    try {
        const municipalities = getMunicipalities();
        
        if (municipalities === "An error occurred") {
            response.status(503).send({ "message": "An error occurred" });
        } else {
            response.status(200).json({ "municipalities": await municipalities });
        }
    } catch (error) {
        response.status(500).send({ "message": "Internal Server Error" });
    }

});

module.exports = router;