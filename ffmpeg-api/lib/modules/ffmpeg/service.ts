
const spawn = require('child_process').spawn;
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
import env from '../../environment';

export default class FFmpegService {

    public resizeVideo (fileName: string, callBack: any) {
      const inputPath  = `${env.getVolumnPath()}/uploads/${fileName}`; 
      const outputPath = `${env.getVolumnPath()}/public/resize/${fileName}`; 
      const screenWidth = 270;

      const proc = spawn(ffmpegPath, ['-i', inputPath, '-filter_complex', `[0:v] scale=${screenWidth}:-1 [final]` , '-map', '[final]', '-an', '-y', outputPath]);
      proc.stdout.on('data', function(data) {
        console.log(`proc.stdout.on('data'): ${data}`);
      });
      proc.stderr.setEncoding("utf8")
      proc.stderr.on('data', function(data) {
        console.log(`proc.stderr.on('data'): ${data}`);
        //callBack(`error: ${data}`);
      });
      proc.on('close', function() {
        console.log(`proc.on('close')`);
        callBack('success');
      });
    }
    
    public exportFrames (fileName: string, callBack: any) {

    }

    public renderMosaic (fileName: string, callBack: any) {

    }

}