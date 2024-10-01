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
exports.Router = void 0;
const express_1 = __importDefault(require("express"));
const school_functions_1 = require("../functions/school.functions");
const Municipalities = __importStar(require("../functions/municipalities.functions"));
const apicache_1 = __importDefault(require("apicache"));
const classes_functions_1 = require("../functions/classes.functions");
const cache = apicache_1.default.middleware;
exports.Router = express_1.default.Router();
exports.Router.get("/municipalities", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const municipalities = yield Municipalities.getMunicipalities();
    res.send(municipalities).status(200);
}));
exports.Router.get("/schools/:kommun", cache('5 minutes'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schoolName = req.params.kommun;
        const schools = yield (0, school_functions_1.getSchools)(schoolName);
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
exports.Router.get("/schoolclasses", cache('5 minutes'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const municipality = req.body.municipality;
        const unitGuid = req.body.unitGuid;
        if (!municipality || !unitGuid) {
            res.status(400).send("Invalid query parameters");
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
