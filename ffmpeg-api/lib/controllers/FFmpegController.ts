import { Request, Response } from 'express';
import FFmpegService from '../modules/ffmpeg/service';

export class FFmpegController {

    private ffmpeg_service: FFmpegService = new FFmpegService();

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

    public export_frames (req: Request, res: Response) {
        this.ffmpeg_service.exportFrames(req.body.filename, (statusMessage) => {
            res.status(200).json({
                statusMessage
            });
        });
    }

    public resize_video (req: Request, res: Response) {
        console.log(`req.body.filename: ${req.body.filename}`)
        this.ffmpeg_service.resizeVideo(req.body.filename, (status: string) => {
            res.status(200).json({
                STATUS: status
            });
        });
        
    }

    public render_mosaic (req: Request, res: Response) {
        console.log(`req.body.filename: ${req.body.filename}`)
        this.ffmpeg_service.renderMosaic(req.body.filename, (status: string) => {
            res.status(200).json({
                STATUS: status
            });
        });
    }
}