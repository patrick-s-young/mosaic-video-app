"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderController = void 0;
const service_1 = require("../modules/render/service");
class RenderController {
    constructor() {
        this.render_service = new service_1.default();
    }
    render_mosaic(req, res, next) {
        this.render_service.renderMosaic(req, res, next);
    }
}
exports.RenderController = RenderController;
