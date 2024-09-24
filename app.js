const express = require('express');
const app = express();

const appListenPort = process.env.PORT || 3000; // ENV for future deployment. PORT 3000 for local testing.
const maintenanceMode = process.env.MAINTENANCE_MODE || false; // ENV for future deployment. True for maintenance mode.
const maintenanceMessage = process.env.MAINTENANCE_MESSAGE || "Service Unavailable. Please try again in a few minutes."; // ENV for future deployment. Default message.

app.use(express.json());

app.listen(appListenPort, () => {
    console.log("Server Listening on port:", appListenPort);
});

if (maintenanceMode == true) {
    app.use((req, res, next) => {
        res.status(503).send({
            "message": maintenanceMessage,
        });
    });
}

app.use("/api/v1/status", require("./routes/api/v1/status"));
app.use("/api/v1/municipalities", require("./routes/api/v1/municipalities"));
app.use("/api/v1/schools", require("./routes/api/v1/schools"));
app.use("/api/v1/classes", require("./routes/api/v1/classes"));
app.use("/api/v1/schedule", require("./routes/api/v1/schedule"));