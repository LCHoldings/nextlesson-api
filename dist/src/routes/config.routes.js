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
exports.Router = void 0;
const express_1 = __importDefault(require("express"));
const apicache_1 = __importDefault(require("apicache"));
const municipalities_functions_1 = require("../functions/municipalities.functions");
const school_functions_1 = require("../functions/school.functions");
const classes_functions_1 = require("../functions/classes.functions");
const schedules_functions_1 = require("../functions/schedules.functions");
const key_functions_1 = require("../functions/key.functions");
const signature_functions_1 = require("../functions/signature.functions");
const schoolyear_functions_1 = require("../functions/schoolyear.functions");
const cache = apicache_1.default.middleware;
exports.Router = express_1.default.Router();
exports.Router.get("/municipalities", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const municipalities = yield (0, municipalities_functions_1.getMunicipalities)();
    res.send(municipalities).status(200);
}));
exports.Router.get("/schools/:municipality", cache('5 minutes'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const municipality = req.params.municipality;
        if (!municipality) {
            res.status(400).send("Invalid parameters");
            return;
        }
        const schools = yield (0, school_functions_1.getSchools)(municipality);
        if (schools.length === 0) {
            res.send("No schools found").status(404);
        }
        else {
            res.send(schools).status(200);
        }
    }
    catch (error) {
        res.send(error).status(500);
    }
}));
exports.Router.get("/schoolclasses/:municipality/:unitGuid", cache('5 minutes'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const municipality = req.params.municipality;
        const unitGuid = req.params.unitGuid;
        console.log(municipality, unitGuid);
        if (!municipality || !unitGuid) {
            res.status(400).send("Invalid parameters");
            return;
        }
        const classes = yield (0, classes_functions_1.getClasses)(municipality, unitGuid);
        if (classes.length === 0) {
            res.status(404).send("No classes found");
        }
        else {
            res.status(200).send(classes);
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.Router.get("/schedule/:municipality/:unitGuid/:scheduleId", cache('5 minutes'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const municipality = req.params.municipality;
        const unitGuid = req.params.unitGuid;
        const scheduleId = req.params.scheduleId;
        if (!municipality || !unitGuid) {
            res.status(400).send("Invalid parameters");
            return;
        }
        const key = yield (0, key_functions_1.getKey)();
        const signature = yield (0, signature_functions_1.getSignature)(scheduleId);
        const schoolYear = yield (0, schoolyear_functions_1.getSchoolYear)(municipality);
        const schedule = yield (0, schedules_functions_1.getSchedule)(key, signature, municipality, unitGuid, schoolYear, scheduleId);
        if (schedule.className.length === 0) {
            res.status(404).send("No schedule found");
        }
        else {
            res.status(200).send(schedule);
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
