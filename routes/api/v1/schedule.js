var express = require('express');
const getSchoolYear = require('../../../functions/getSchoolYear');
const getSchedule = require('../../../functions/getSchedule');
const getKey = require('../../../functions/getKey');
const getSignature = require('../../../functions/getSignature');
var router = express.Router();

router.get("/:municipality/:unitGuid/:scheduleId", async (request, response) => {
    try {
        const municipality = request.params.municipality;
        const unitGuid = request.params.unitGuid;
        const scheduleId = request.params.scheduleId;

        const key = await getKey();
        const signature = await getSignature(scheduleId);

        const schoolYear = await getSchoolYear(municipality);

        const schedule = await getSchedule(key, signature, municipality, unitGuid, schoolYear);
        if (schedule === "An error occurred") {
            response.status(503).send({ "message": "An error occurred" });
        } else {
            response.status(200).json({ schedule });
        }
    } catch (error) {
        response.status(500).send({ "message": "Internal Server Error" });
    }
});

module.exports = router;