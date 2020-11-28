import { Application, Request, Response } from 'express';
import { RenderController } from '../controllers/renderController';


export class RenderRoutes {

  private render_controller: RenderController = new RenderController();
  
  public route(app: Application) {

      app.post('/render/mosaic',  
         (req, res, next) => this.render_controller.render_mosaic(req, res, next), 
         (req, res, next) => {
         res.status(200).json({message:`/render/mosaic: POST request successfull. Rendered mosaic with movie: ${req.body.filename}`});
      });
   }
}