import axios from "axios";
import * as AZConverter from "../functions/azconverter.functions";
import { Schedule } from '../types/schedule.types';
import { getDateWeek } from "./GetDateWeek.functions";

export const getSchedule = async (
    key: string, 
    signature: string, 
    municipality: string, 
    unitGuid: string, 
    schoolYear: string, 
    scheduleId: string
): Promise<Schedule> => {
    const date = new Date(new Date().toLocaleString("sv-SE", { timeZone: "Europe/Stockholm" }));

    let scheduleDay = (date.getDay() + 6) % 7 + 1;
    
    const week = Math.ceil(getDateWeek(date, scheduleDay));
    const year = date.getFullYear();
    const day = date.getDate();

    if (scheduleDay === 6 || scheduleDay === 7) {
        scheduleDay = 1;
    }

    try {
        // Pretty ugly since its just a reverse engineered post request to the web interface Skola24 api
        const res = await axios.post('https://web.skola24.se/api/render/timetable', {
            renderKey: key,
            selection: signature,
            scheduleDay: 0,
            week: week,
            year: year,
            host: `${AZConverter.Convert(municipality)}.skola24.se`,
            unitGuid: unitGuid,
            schoolYear: schoolYear,
            startDate: null,
            endDate: null,
            blackAndWhite: false,
            width: 1223,
            height: 968,
            selectionType: 4,
            showHeader: false,
            periodText: "",
            privateFreeTextMode: false,
            privateSelectionMode: null,
            customerKey: "",
        }, {
            headers: {
                'X-Scope': '8a22163c-8662-4535-9050-bc5e1923df48',
                'Content-Type': 'application/json',
            }
        });

        if (res.data.exception && res.data.exception.code) {
            throw new Error(res.data.exception.context);
        } else if (res.data.validation[0] && res.data.validation[0].message) {
            throw new Error(res.data.validation[0].message);
        }

        // Remove lessons that doesn't exist on the actual schedule on the website.
        const lessonInfo = res.data.data.lessonInfo.filter((lesson: any) => {
            return lesson.texts.every((text: string) => 
                res.data.data.textList.some((textItem: any) => textItem.text === text)
            );
        }).map((lesson: any) => {
            return {
                ...lesson,
                textExists: true
            };
        });

        const schedule: Schedule = {
            date: {
                year: year,
                week: week,
                day: day
            },
            lessonInfo,
            schoolName: res.data.data.metadata[0].schoolName,
            lastPublished: res.data.data.metadata[0].lastPublished,
            className: scheduleId,
            unitGuid,
            municipality
        };

        return schedule;
    } catch (err) {
        // TODO: Return this error to the route so it can be sent to the client. (For all get functions)
        throw new Error("An error occurred while fetching the schedule.");
    }
};
