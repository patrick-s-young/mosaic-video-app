import env from '../../environment';
import { Request, Response } from 'express';
const axios = require('axios');


export default class FileService {

    public uploadVideo (req: Request, res: Response, next: any) {
        const uploadVideoDirectory = `${env.getVolumnPath()}/uploads`;
        const myFile = req['files'].myFile;
        res.locals.assetID = Date.now();
        res.locals.filename  = `${res.locals.assetID}.mov`;
        const path = `${uploadVideoDirectory}/${res.locals.filename}`;
        myFile.mv(path, (err) => {
            next();
        });
    }
}
