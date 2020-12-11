"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileController = void 0;
const service_1 = require("../modules/file/service");
class FileController {
    constructor() {
        this.file_service = new service_1.default();
    }
    upload_video(req, res, next) {
        console.log(`FileController.ts : upload_video : req.body.assetID: ${req.body.assetID}`);
        this.file_service.uploadVideo(req, res, next);
    }
}
exports.FileController = FileController;
