var express = require('express');
const getSchools = require('../../../functions/getSchools');
var router = express.Router();

router.get("/:municipality", async (request, response) => {
    try {
        const municipality = request.params.municipality;
        const schools = await getSchools(municipality);
        
        if (schools === "An error occurred") {
            response.status(503).send({ "message": "An error occurred" });
        } else {
            response.status(200).json({ "schools": schools });
        }
    } catch (error) {
        response.status(500).send({ "message": "Internal Server Error" });
    }
});

module.exports = router;