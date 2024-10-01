const specialChars: { [key: string]: string } = {
    å: "a",
    ä: "a",
    ö: "o",
    Å: "A",
    Ä: "A",
    Ö: "O",
};

export const Convert = (text: string): string => {
    const AZConverted = text
        .split("")
        .map((char) => specialChars[char] || char)
        .join("")
        .toLowerCase()
        .replace(/[-\s]/g, "");

    return AZConverted;
}
