import { Request, Response } from 'express';
import FileService from '../modules/file/service';

export class FileController {

    private file_service: FileService = new FileService();

    public upload_video (req: Request, res: Response, next: any) {
        this.file_service.uploadVideo(req, res, next);
    }
}
