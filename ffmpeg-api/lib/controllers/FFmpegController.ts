import { Request, Response } from 'express';
import FFmpegService from '../modules/ffmpeg/service';

export class FFmpegController {

    private ffmpeg_service: FFmpegService = new FFmpegService();

    public resize_video (req: Request, res: Response) {
        console.log(`req.body.filename: ${req.body.filename}`)
        this.ffmpeg_service.resizeVideo(req.body.filename, (status: string) => {
            res.status(200).json({
                STATUS: status
            });
        });
        
    }

    public export_frames (req: Request, res: Response) {
        res.status(200).json({message:"FFmpegController: export_frames called"});
        /*
        this.render_service.exportFrames(filename, (err, res, body) => {
            res.status(response_status_codes.success).json({
                STATUS: 'SUCCESS',
                MESSAGE: body
            });
        });
        */
    }

    public render_mosaic (req: Request, res: Response) {
        res.status(200).json({message:"FFmpegController: render_mosaic called"});
        /*
        this.render_service.renderMosaic (filename, (err, res, body) => {
            res.status(response_status_codes.success).json({
                STATUS: 'SUCCESS',
                MESSAGE: body
            });
        });
        */
    }
}