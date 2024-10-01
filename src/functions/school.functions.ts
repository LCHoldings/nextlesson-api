import axios from "axios";
import * as AZConverter from "../functions/azconverter.functions";

export const getSchools = async (schoolName: string): Promise<string[]> => {
    try {
        const response = await axios.post('https://web.skola24.se/api/services/skola24/get/timetable/viewer/units', {
            "getTimetableViewerUnitsRequest": { "hostname": (AZConverter.Convert(schoolName) + ".skola24.se") }
        }, {
            headers: {
                'X-Scope': '8a22163c-8662-4535-9050-bc5e1923df48',
                "Accept": "application/json"
            }
        });

        const unitsResponse = response.data.data?.getTimetableViewerUnitsResponse;

        if (!unitsResponse || response.data.exception && response.data.exception.code) {
            throw new Error(response.data.exception?.context || 'Unknown error');
        }

        return unitsResponse.units;
    } catch (error) {
        console.error("Error fetching schools:", error);
        return [];
    }
};