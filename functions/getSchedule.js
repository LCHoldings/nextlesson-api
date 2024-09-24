const axios = require('axios');
const convertToSkola24 = require('./convertToSkola24');

function getDateWeek(date) {
    const currentDate =
        (typeof date === 'object') ? date : new Date();
    const januaryFirst =
        new Date(currentDate.getFullYear(), 0, 1);
    const daysToNextMonday =
        (januaryFirst.getDay() === 1) ? 0 :
            (7 - januaryFirst.getDay()) % 7;
    const nextMonday =
        new Date(currentDate.getFullYear(), 0,
            januaryFirst.getDate() + daysToNextMonday);

    return (currentDate < nextMonday) ? 52 :
        (currentDate > nextMonday ? Math.ceil(
            (currentDate - nextMonday) / (24 * 3600 * 1000) / 7) : 1);
}

async function getSchedule(key, signature, municipality, unitGuid, schoolYear) {
    const date = new Date(new Date().toLocaleString("sv-SE", { timeZone: "Europe/Stockholm" }));
    const scheduleDay = (date.getDay() + 6) % 7 + 1;
    const week = Math.ceil(getDateWeek(date));
    const year = date.getFullYear();

    console.log("!-! | Key: " + key);
    console.log("!-! | Signature: " + signature);
    console.log("!-! | Municipality: " + municipality);
    console.log("!-! | UnitGuid: " + unitGuid);
    console.log("!-! | SchoolYear: " + schoolYear);
    console.log("!-! | Host: " + ((convertToSkola24(municipality)) + ".skola24.se"));
    console.log("!-! | ScheduleDay: " + scheduleDay);
    console.log("!-! | Week: " + week);
    console.log("!-! | Year: " + year);

    try {
        var res = await axios.post('https://web.skola24.se/api/render/timetable', {
            "renderKey": key,
            "selection": signature,
            "scheduleDay": scheduleDay,
            "week": week,
            "year": year,
            "host": ((convertToSkola24(municipality)) + ".skola24.se"),
            "unitGuid": unitGuid,
            "schoolYear": schoolYear,
            "startDate": null,
            "endDate": null,
            "blackAndWhite": false,
            "width": 125,
            "height": 550,
            "selectionType": 4,
            "showHeader": false,
            "periodText": "",
            "privateFreeTextMode": false,
            "privateSelectionMode": null,
            "customerKey": "",
        }, {
            headers: {
                'X-Scope': '8a22163c-8662-4535-9050-bc5e1923df48',
                'Content-Type': 'application/json',
            }
        });

        if (res.data.exception && res.data.exception.code) {
            throw new Error(res.data.exception.context);
        }

        // Remove all data except for the info we need. Lets us cache the data without issues.
        res.data.data.textList = [];
        res.data.data.boxList = [];
        res.data.data.lineList = [];

        return res.data;
    } catch (err) {
        return ("An error occurred");
    }
}

module.exports = getSchedule;