import { Application, Request, Response } from 'express';
import { RenderController } from '../controllers/renderController';

export class RenderRoutes {

  private render_controller: RenderController = new RenderController();
  
  public route(app: Application) {

      app.post('/render/mosaic', (req: Request, res: Response) => {
         //res.status(200).json({message:"/render/mosaic: Post request successfull"});
         this.render_controller.render_mosaic(req, res);
      });
   }
}