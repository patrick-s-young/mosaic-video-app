import env from '../../environment';
import { Request, Response } from 'express';
const axios = require('axios');
const { fstat, rename } = require('fs');

export default class FileService {

    public uploadVideo (req: Request, res: Response, next: any) {
        const uploadVideoDirectory = `${env.getVolumnPath()}/uploads`;
        const myFile = req['files'].myFile;
        res.locals.filename  = `upload_${Date.now()}.mov`;
        const path = `${uploadVideoDirectory}/${res.locals.filename}`;
        myFile.mv(path, (err) => {
            next();
        });
    }


}
