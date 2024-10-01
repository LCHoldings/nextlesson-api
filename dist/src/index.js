"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.application = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const config_routes_1 = require("./routes/config.routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.application = app;
const port = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/v1', config_routes_1.Router);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
