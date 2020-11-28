import { Request, Response } from 'express';
const axios = require('axios');

export default class RenderService {
    
    public resizeVideo (req: Request, res: Response, next: any) {
        axios.post('http://localhost:3002/resize', {
              filename: res.locals.filename
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
    
    public exportFrames (fileName: string, callBack: any) {

    }

    public renderMosaic (req: Request, res: Response, next: any) {
        axios.post('http://localhost:3002/mosaic', {
              filename: req.body.filename
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