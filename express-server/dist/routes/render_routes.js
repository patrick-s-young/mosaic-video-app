"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderRoutes = void 0;
const renderController_1 = require("../controllers/renderController");
const environment_1 = require("../environment");
class RenderRoutes {
    constructor() {
        this.render_controller = new renderController_1.RenderController();
    }
    route(app) {
        app.get('/render/mosaic', (req, res, next) => this.render_controller.render_mosaic(req, res, next), (req, res, next) => {
            console.log(`express-server : render_routes : res.locals.response: ${res.locals.response}`);
            const downloadRenderDirectory = `${environment_1.default.getVolumnPath()}/public/${req.query.assetID}/mosaic.mov`;
            res.download(downloadRenderDirectory);
            //res.status(200).json({message:`/render/mosaic: POST request successfull. Rendered mosaic with movie: ${req.body.filename}`});
        });
    }
}
exports.RenderRoutes = RenderRoutes;
