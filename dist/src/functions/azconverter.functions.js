"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convert = void 0;
const specialChars = {
    å: "a",
    ä: "a",
    ö: "o",
    Å: "A",
    Ä: "A",
    Ö: "O",
};
const Convert = (text) => {
    const AZConverted = text
        .split("")
        .map((char) => specialChars[char] || char)
        .join("")
        .toLowerCase()
        .replace(/[-\s]/g, "");
    return AZConverted;
};
exports.Convert = Convert;
