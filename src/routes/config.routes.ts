import express , { Request, Response } from "express";
import apicache from 'apicache';
import {
    getMunicipalities,
    getSchools,
    getClasses,
    getSchedule,
    getKey,
    getSignature,
    getSchoolYear
} from "../functions";

const cache = apicache.middleware;

export const Router = express.Router()

// Health check
Router.get("/status", async (req: Request, res: Response) => {
    res.send({
        status: true,
        message: "N/A"
    }).status(200);
});

// Get all municipalities from municipalities.json
Router.get("/municipalities", async (req: Request, res: Response) => {
    const municipalities = await getMunicipalities();
    res.send(municipalities).status(200);
});

// Get all schools within a municipality
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

// Get all classes within a school
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

// Get schedule for a specific class, school and municipality
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
