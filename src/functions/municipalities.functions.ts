import { Municipalities } from '../types/municipalities.types';
import fs from "fs";

export const getMunicipalities = async (): Promise<Municipalities> => {
    return new Promise((resolve, reject) => {
        fs.readFile('src/data/municipalities.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
}