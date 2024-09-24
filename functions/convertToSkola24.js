const specialChars = {
    å: "a",
    ä: "a",
    ö: "o",
    Å: "A",
    Ä: "A",
    Ö: "O",
};

function AZConvert(text) {

    const AZConverted = text
        .split("")
        .map((char) => specialChars[char] || char)
        .join("")
        .toLowerCase()
        .replace(/[-\s]/g, "");

    return AZConverted;
}

module.exports = AZConvert;