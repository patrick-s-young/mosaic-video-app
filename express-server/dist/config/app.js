"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const file_routes_1 = require("../routes/file_routes");
const render_routes_1 = require("../routes/render_routes");
const common_routes_1 = require("../routes/common_routes");
const cors = require("cors");
const expressFileUpload = require('express-fileupload');
const environment_1 = require("../environment");
class App {
    constructor() {
        this.fileRoutes = new file_routes_1.FileRoutes();
        this.renderRoutes = new render_routes_1.RenderRoutes();
        this.commonRoutes = new common_routes_1.CommonRoutes();
        this.app = express();
        this.config();
        this.fileRoutes.route(this.app);
        this.renderRoutes.route(this.app);
        this.commonRoutes.route(this.app);
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(expressFileUpload());
        this.app.use(express.static(`${environment_1.default.getVolumnPath()}/public`));
    }
}
exports.default = new App().app;
