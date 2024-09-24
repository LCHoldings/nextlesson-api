var express = require('express');
const getClasses = require('../../../functions/getClasses');
var router = express.Router();

router.get("/:municipality/:unitGuid", async (request, response) => {
    try {
        const municipality = request.params.municipality;
        const unitGuid = request.params.unitGuid;

        const classes = await getClasses(municipality, unitGuid);
        console.log(classes);
        if (classes === "An error occurred") {
            response.status(503).send({ "message": "An error occurred" });
        } else {
            response.status(200).json({ classes });
        }
    } catch (error) {
        response.status(500).send({ "message": "Internal Server Error" });
    }
});

module.exports = router;