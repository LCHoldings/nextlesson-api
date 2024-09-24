const axios = require('axios');
const convertToSkola24 = require('./convertToSkola24');

async function getSchoolYear(municipality) {
    try {
        const res = await axios.post('https://web.skola24.se/api/get/active/school/years', {
            "hostName": ((convertToSkola24(municipality)) + ".skola24.se"),
            "checkSchoolYearsFeatures": false
        }, {
            headers: {
            'X-Scope': '8a22163c-8662-4535-9050-bc5e1923df48',
            'Content-Type': 'application/json',
            }
        });
        
        if (res.data.exception && res.data.exception.code) {
            throw new Error(res.data.exception.context);
        }
        return res.data.data.activeSchoolYears[0].guid;
    } catch (err) {
        return ("An error occurred");
    }
}

module.exports = getSchoolYear;