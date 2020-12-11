"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileRoutes = void 0;
const fileController_1 = require("../controllers/fileController");
const service_1 = require("../modules/render/service");
class FileRoutes {
    constructor() {
        this.file_controller = new fileController_1.FileController();
        this.render_service = new service_1.default();
    }
    route(app) {
        app.post('/file/upload', (req, res, next) => this.file_controller.upload_video(req, res, next), (req, res, next) => this.render_service.resizeVideo(req, res, next), (req, res, next) => {
            console.log(`res.locals.assetID: ${res.locals.assetID}`);
            res.status(200).json({ assetID: res.locals.assetID });
        });
    }
}
exports.FileRoutes = FileRoutes;
