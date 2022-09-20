"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const videos_router_1 = require("./routs/videos-router");
const testing_alll_data_1 = require("./routs/testing-alll-data");
const app = (0, express_1.default)();
const port = process.env.PORT || 5001;
const jsonParserMiddleware = body_parser_1.default.json();
app.use(jsonParserMiddleware);
app.use('/videos', videos_router_1.videosRouter);
app.use('/testing', testing_alll_data_1.testingRouter);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
