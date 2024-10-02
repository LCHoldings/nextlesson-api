import axios from "axios";

export const getKey = async (): Promise<string> => {
    try {
        const res = await axios.post('https://web.skola24.se/api/get/timetable/render/key', {}, {
            headers: {
                'X-Scope': '8a22163c-8662-4535-9050-bc5e1923df48',
                'Content-Type': 'application/json',
            }
        });
        
        if (res.data.exception && res.data.exception.code) {
            throw new Error(res.data.exception.context);
        }

        return res.data.data.key;
    } catch (err) {
        return "The key could not be fetched";
    }
}
