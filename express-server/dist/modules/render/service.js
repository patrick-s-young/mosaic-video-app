"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require('axios');
class RenderService {
    resizeVideo(req, res, next) {
        axios.post('http://host.docker.internal:3002/resize', {
            assetID: res.locals.assetID
        })
            .then(function (response) {
            console.log(response);
            res.locals.status = 'success';
            next();
        })
            .catch(function (error) {
            console.log(error);
            res.locals.status = 'error';
            res.locals.error = error;
            next();
        });
    }
    exportFrames(fileName, callBack) {
    }
    renderMosaic(req, res, next) {
        axios.post('http://localhost:3002/mosaic', {
            assetID: req.query.assetID
        })
            .then(function (response) {
            console.log(response);
            res.locals.response = 'success';
            next();
        })
            .catch(function (error) {
            console.log(error);
            res.locals.response = 'error';
            res.locals.error = error;
            next();
        });
    }
}
exports.default = RenderService;
