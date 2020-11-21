import { Request, Response } from 'express';
import RenderService from '../modules/render/service';

export class RenderController {

    private render_service: RenderService = new RenderService();

    public render_mosaic (req: Request, res: Response) {
        res.status(200).json({message:"RenderController: render_mosaic called"});
        
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