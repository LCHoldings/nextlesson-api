"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchedule = void 0;
const axios_1 = __importDefault(require("axios"));
const AZConverter = __importStar(require("../functions/azconverter.functions"));
const GetDateWeek_functions_1 = require("./GetDateWeek.functions");
const getSchedule = (key, signature, municipality, unitGuid, schoolYear, scheduleId) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date(new Date().toLocaleString("sv-SE", { timeZone: "Europe/Stockholm" }));
    let scheduleDay = (date.getDay() + 6) % 7 + 1;
    const week = Math.ceil((0, GetDateWeek_functions_1.getDateWeek)(date, scheduleDay));
    const year = date.getFullYear();
    const day = date.getDate();
    if (scheduleDay === 6 || scheduleDay === 7) {
        scheduleDay = 1;
    }
    // Logging the details
    console.log("!-! | --- GET SCHEDULE --- | !-!");
    console.log(`!-! | Key: ${key}`);
    console.log(`!-! | Signature: ${signature}`);
    console.log(`!-! | Municipality: ${municipality}`);
    console.log(`!-! | UnitGuid: ${unitGuid}`);
    console.log(`!-! | SchoolYear: ${schoolYear}`);
    console.log(`!-! | Host: ${AZConverter.Convert(municipality)}.skola24.se`);
    console.log(`!-! | ScheduleDay: ${scheduleDay}`);
    console.log(`!-! | Week: ${week}`);
    console.log(`!-! | Year: ${year}`);
    console.log(`!-! | Day: ${day}`);
    try {
        const res = yield axios_1.default.post('https://web.skola24.se/api/render/timetable', {
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
        }
        else if (res.data.validation[0] && res.data.validation[0].message) {
            throw new Error(res.data.validation[0].message);
        }
        const schedule = {
            date: {
                year: year,
                week: week,
                day: day
            },
            lessonInfo: res.data.data.lessonInfo,
            schoolName: res.data.data.metadata[0].schoolName,
            lastPublished: res.data.data.metadata[0].lastPublished,
            className: scheduleId,
            municipality
        };
        return schedule;
    }
    catch (err) {
        console.error("An error occurred:", err);
        throw new Error("An error occurred while fetching the schedule.");
    }
});
exports.getSchedule = getSchedule;
