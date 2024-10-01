"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Convert;
const specialChars = {
    å: "a",
    ä: "a",
    ö: "o",
    Å: "A",
    Ä: "A",
    Ö: "O",
};
function Convert(text) {
    const AZConverted = text
        .split("")
        .map((char) => specialChars[char] || char)
        .join("")
        .toLowerCase()
        .replace(/[-\s]/g, "");
    return AZConverted;
}
