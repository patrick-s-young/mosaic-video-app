import { Application, Request, Response } from 'express';
import { FFmpegController } from '../controllers/FFmpegController';

export class FFmpegRoutes {

  private ffmpeg_controller: FFmpegController = new FFmpegController();
  
  public route(app: Application) {

      app.post('/probe', (req: Request, res: Response) => {
         console.log(`req.body.filename: ${req.body.filename}`);
         this.ffmpeg_controller.probe_video(req, res);
      });

      app.post('/frames', (req: Request, res: Response) => {
         //res.status(200).json({message:"/render/frames: Post request successfull"});
         this.ffmpeg_controller.export_frames(req, res);
      });

      app.post('/resize', (req: Request, res: Response) => {
         console.log(`req.body.filename: ${req.body.filename}`);
         //res.status(200).json({message:"/render/resize: Post request successfull"});
         this.ffmpeg_controller.resize_video(req, res);
      });

      app.post('/mosaic', (req: Request, res: Response) => {
         //res.status(200).json({message:"/render/mosaic: Post request successfull"});
         this.ffmpeg_controller.render_mosaic(req, res);
      });
   }
}