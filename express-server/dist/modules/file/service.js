"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = require("../../environment");
const axios = require('axios');
class FileService {
    uploadVideo(req, res, next) {
        console.log('express-server : service.js : uploadVideo ');
        const uploadVideoDirectory = `${environment_1.default.getVolumnPath()}/uploads`;
        console.log(`uploadVideoDirectory: ${uploadVideoDirectory}`);
        const myFile = req['files'].myFile;
        res.locals.assetID = Date.now();
        res.locals.filename = `${res.locals.assetID}.mov`;
        const path = `${uploadVideoDirectory}/${res.locals.filename}`;
        myFile.mv(path, (err) => {
            next();
        });
    }
}
exports.default = FileService;
