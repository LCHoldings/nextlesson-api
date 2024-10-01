
import express , { Express, Request, Response } from "express";
import apicache from 'apicache';

import { getMunicipalities}  from "../functions/municipalities.functions";
import { getSchools } from "../functions/school.functions";
import { getClasses } from "../functions/classes.functions";
import { getSchedule } from "../functions/schedules.functions";
import { getKey } from "../functions/key.functions";
import { getSignature } from "../functions/signature.functions";
import { getSchoolYear } from "../functions/schoolyear.functions";

const cache = apicache.middleware;

export const Router = express.Router()

Router.get("/municipalities", async (req: Request, res: Response) => {
    const municipalities = await getMunicipalities();
    res.send(municipalities).status(200);
});

Router.get("/schools/:municipality", cache('5 minutes'), async (req: Request, res: Response) => {
    try {
        const municipality = req.params.municipality as string;

        if (!municipality) {
            res.status(400).send("Invalid parameters");
            return;
        }

        const schools = await getSchools(municipality);
        if (schools.length === 0) {
            res.send("No schools found").status(404);
        } else {
            res.send(schools).status(200);
        }
    } catch (error) {
        res.send(error).status(500);
    }
});

Router.get("/classes/:municipality/:unitGuid", cache('5 minutes'), async (req: Request, res: Response) => {
    try {
        const municipality = req.params.municipality as string;
        const unitGuid = req.params.unitGuid as string;

        if (!municipality || !unitGuid) {
            res.status(400).send("Invalid parameters");
            return;
        }

        const classes = await getClasses(municipality, unitGuid);
        if (classes.length === 0) {
            res.status(404).send("No classes found");
        } else {
            res.status(200).send(classes);
        }
        
    } catch (error) {
        res.status(500).send(error);
    }
});

Router.get("/schedule/:municipality/:unitGuid/:scheduleId", cache('5 minutes'), async (req: Request, res: Response) => {
    try {
        const municipality = req.params.municipality as string;
        const unitGuid = req.params.unitGuid as string;
        const scheduleId = req.params.scheduleId as string;

        if (!municipality || !unitGuid || !scheduleId) {
            res.status(400).send("Invalid parameters");
            return;
        }

        const key = await getKey();
        const signature = await getSignature(scheduleId);
        const schoolYear = await getSchoolYear(municipality);

        const schedule = await getSchedule(key, signature, municipality, unitGuid, schoolYear, scheduleId);
        if (!schedule || schedule.className.length === 0) {
            res.status(404).send("No schedule found");
        } else {
            res.status(200).send(schedule);
        }
        
    } catch (error) {
        res.status(500).send(error);
    }
});