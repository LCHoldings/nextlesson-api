import axios from "axios";
import { Convert } from "../functions/azconverter.functions";

export const getClasses = async (municipality: string, unitGuid: string): Promise<string[]> => {
    console.log(municipality, unitGuid);
    try {
        const response = await axios.post('https://web.skola24.se/api/get/timetable/selection', {
            "hostName": (Convert(municipality) + ".skola24.se"),
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
                "Accept": "application/json"
            }
        });
        if (response.data.exception && response.data.exception.code) {
            throw new Error(response.data.exception?.context || 'Unknown error');
        } else {
            return response.data.data.classes;
        }

    } catch (error) {
        console.error("Error fetching schools:", error);
        return [];
    }
}