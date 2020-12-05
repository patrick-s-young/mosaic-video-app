import { Request, Response } from 'express';
import FFmpegService from '../modules/ffmpeg/service';

export class FFmpegController {

    private ffmpeg_service: FFmpegService = new FFmpegService();

    public resize_video (req: Request, res: Response, next: any) {
        console.log(`FFmpegController.ts : resize_video : req.body.assetID: ${req.body.assetID}`);
        this.ffmpeg_service.resizeVideo(req, res, next);
    }

    public export_frames (req: Request, res: Response, next: any) {
        console.log(`FFmpegController.ts : export_frames : req.body.assetID: ${req.body.assetID}`);
        this.ffmpeg_service.exportFrames(req, res, next);
    }

    public render_mosaic (req: Request, res: Response, next: any) {
        console.log(`FFmpegController.ts : render_mosaic : req.body.assetID: ${req.body.assetID}`);
        this.ffmpeg_service.renderMosaic(req, res, next);
    }


    public probe_video (req: Request, res: Response) {
        this.ffmpeg_service.probeVideo(req.body.filename, (width: number, height: number, duration: number, r_frame_rate: number, avg_frame_rate: number, bit_rate: number) => {
            res.status(200).json({
                width,
                height,
                duration,
                r_frame_rate,
                avg_frame_rate,
                bit_rate
            });
        });
    }




}