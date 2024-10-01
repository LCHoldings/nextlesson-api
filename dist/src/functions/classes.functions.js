"use strict";
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
exports.getClasses = void 0;
const axios_1 = __importDefault(require("axios"));
const azconverter_functions_1 = require("../functions/azconverter.functions");
const getClasses = (municipality, unitGuid) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(municipality, unitGuid);
    try {
        const response = yield axios_1.default.post('https://web.skola24.se/api/get/timetable/selection', {
            "hostName": ((0, azconverter_functions_1.Convert)(municipality) + ".skola24.se"),
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
            throw new Error(((_a = response.data.exception) === null || _a === void 0 ? void 0 : _a.context) || 'Unknown error');
        }
        else {
            return response.data.data;
        }
    }
    catch (error) {
        console.error("Error fetching schools:", error);
        return [];
    }
});
exports.getClasses = getClasses;
