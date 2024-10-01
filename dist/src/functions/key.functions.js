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
exports.getKey = void 0;
const axios_1 = __importDefault(require("axios"));
const getKey = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield axios_1.default.post('https://web.skola24.se/api/get/timetable/render/key', {}, {
            headers: {
                'X-Scope': '8a22163c-8662-4535-9050-bc5e1923df48',
                'Content-Type': 'application/json',
            }
        });
        if (res.data.exception && res.data.exception.code) {
            throw new Error(res.data.exception.context);
        }
        return res.data.data.key;
    }
    catch (err) {
        return "An error occurred";
    }
});
exports.getKey = getKey;
