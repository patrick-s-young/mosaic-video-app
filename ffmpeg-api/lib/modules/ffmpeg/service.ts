const spawn = require('child_process').spawn;
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobe = require('ffprobe');
const ffprobeStatic = require('ffprobe-static');
const { createFfmpegFilterComplexStr } = require('./utils/createFfmpegFilterComplexStr');
import env from '../../environment';

export default class FFmpegService {

  public probeVideo (filename: string, callBack: any) {
    const inputPath  = `${env.getVolumnPath()}/uploads/${filename}`; 
    ffprobe(inputPath, { path: ffprobeStatic.path })
      .then(function (info, err) {
        if (err) console.log(`Error ${err}`);
        const r_arr = info.streams[0].r_frame_rate.split('/');
        const avg_arr = info.streams[0].avg_frame_rate.split('/');
        callBack(
          info.streams[0].width, 
          info.streams[0].height,
          info.streams[0].duration,
          (r_arr[0] / r_arr[1]).toFixed(2),
          (avg_arr[0] / avg_arr[1]).toFixed(2)),
          info.streams[0].bit_rate
      });
  }

  public exportFrames (filename: string, callBack: any) {
    const inputPath  = `${env.getVolumnPath()}/public/resize/${filename}`; 
    const outputPath = `${env.getVolumnPath()}/public/frames/`; 
    //const proc = spawn(ffmpegPath, ['-ss', 1, '-i', inputPath, '-vframes', 1, `${outputPath}extractframe.jpg`]);
    const duration = 8.0;
    const frameInterval = 18 / duration;
    const proc = spawn(ffmpegPath, ['-i', inputPath, '-r', frameInterval, `${outputPath}img%03d.jpg`]);
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

  public resizeVideo (filename: string, callBack: any) {
    const inputPath  = `${env.getVolumnPath()}/uploads/${filename}`; 
    const outputPath = `${env.getVolumnPath()}/public/resize/${filename}`; 
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

  public renderMosaic (filename: string, callBack: any) {
    const filterParams = {
      panelCount: 9,
      sequenceCount: 3,
      fadeInToOutDuration: 2.0,
      outputDuration: 15.0,
      outputSize: '1080x1080',
      bgFrameStart: 1.0,
      bgFrameHue: ', hue=s=0.1',
      preCropStr: '',
      inputHeight: 1920,
      inputWidth: 1080,
      inputDuration: 8.0,
    }

   const inputPath  = `${env.getVolumnPath()}/uploads/${filename}`; 
   const outputPath = `${env.getVolumnPath()}/public/download/${filename}`;
   const ffmpegFilterComplexStr = createFfmpegFilterComplexStr(filterParams);

    const proc = spawn(ffmpegPath, ['-i', inputPath, '-filter_complex', ffmpegFilterComplexStr, '-map', '[final]', '-an', '-y', outputPath]);
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

}