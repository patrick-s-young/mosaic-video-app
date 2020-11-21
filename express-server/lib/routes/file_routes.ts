import {Application, Request, Response } from 'express';
import { FileController } from '../controllers/fileController';
import RenderService from '../modules/render/service';

export class FileRoutes {

  private file_controller: FileController = new FileController();
  private render_service: RenderService = new RenderService();
   
   public route(app: Application) {

      app.post('/file/upload',  
         (req, res, next) => this.file_controller.upload_video(req, res, next), 
         (req, res, next) => this.render_service.resizeVideo(req, res, next),
         (req, res, next) => {
         res.status(200).json({message:`/file/upload: POST request successfull. Uploaded and resized video filename: ${res.locals.filename}`});
      });

   }
}