const municipalities = require('../data/municipalities.js')

async function getMunicipalities() {
    try {
        return municipalities;
    } catch (err) {
        return "An error occurred";
    }
}

module.exports = getMunicipalities;