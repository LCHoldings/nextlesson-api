const axios = require('axios');
const convertToSkola24 = require('./convertToSkola24');

async function getClasses(municipality, unitGuid) {
    try {
        const res = await axios.post('https://web.skola24.se/api/get/timetable/selection', {
            "hostName": (convertToSkola24(municipality)) + ".skola24.se",
            "unitGuid": unitGuid,
            "filters": {
                "class": true,
                "course": false,
                "group": false,
                "period": false,
                "room": false,
                "student": false,
                "subject": false,
                "teacher": false,
            },
        }, {
            headers: {
                'X-Scope': '8a22163c-8662-4535-9050-bc5e1923df48',
                'Content-Type': 'application/json',
            }
        });
        if (res.data.exception && res.data.exception.code) {
            throw new Error(res.data.exception.context);
        }
        
        return res.data.data.classes;
    } catch (err) {
        return ("An error occurred");
    }
}

module.exports = getClasses;