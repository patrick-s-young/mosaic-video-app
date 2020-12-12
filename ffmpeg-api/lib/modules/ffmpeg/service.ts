const spawn = require('child_process').spawn;
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobe = require('ffprobe');
const ffprobeStatic = require('ffprobe-static');
const { createFfmpegFilterComplexStr } = require('./utils/createFfmpegFilterComplexStr');
import env from '../../environment';
import { Request, Response } from 'express';
const fs = require('fs');

export default class FFmpegService {

  public resizeVideo (req: Request, res: Response, next: any) {
    const assetID = req.body.assetID;
    const inputPath  = `${env.getVolumnPath()}/uploads/${assetID}.mov`; 
    const outputDirectory = `${env.getVolumnPath()}/public/${assetID}`; 
    fs.mkdir(outputDirectory, (err) => {
      //res.locals.status = 'error';
      //res.locals.error = err;
      console.log(`fs.mkdir error: ${err}`)
      //return next();
    });
    const outputPath = `${outputDirectory}/resized.mov`; 
    const screenWidth = 480;
    const proc = spawn(ffmpegPath, ['-i', inputPath, '-filter_complex', `[0:v] crop=1080:1080:0:420, scale=${screenWidth}:-1 [final]` , '-map', '[final]', '-an', '-y', outputPath]);
    proc.stdout.on('data', function(data) {
      console.log(`proc.stdout.on('data'): ${data}`);
    });
    proc.stderr.setEncoding("utf8")
    proc.stderr.on('data', function(data) {
     // console.log(`proc.stderr.on('data'): ${data}`);
    });
    proc.on('close', function() {
      //res.locals.status = 'success';
      console.log(`resizeVideo : proc.on('close')`);
      next();
    });
  }

  public exportFrames (req: Request, res: Response, next: any) {
    console.log('>>> in exportFrames')
    const assetID = req.body.assetID;
    const inputPath  = `${env.getVolumnPath()}/public/${assetID}/resized.mov`; 
    const outputPath = `${env.getVolumnPath()}/public/${assetID}/`; 
    //const proc = spawn(ffmpegPath, ['-ss', 1, '-i', inputPath, '-vframes', 1, `${outputPath}extractframe.jpg`]);
    const duration = 6.0;
    const frameInterval = 18 / duration;
    const proc = spawn(ffmpegPath, ['-i', inputPath, '-vf', 'hue=s=0.1', '-r', frameInterval, `${outputPath}img%03d.jpg`]);
    proc.stdout.on('data', function(data) {
      console.log(`proc.stdout.on('data'): ${data}`);
    });
    proc.stderr.setEncoding("utf8")
    proc.stderr.on('data', function(data) {
      console.log(`proc.stderr.on('data'): ${data}`);
    });
    proc.on('close', function() {
      res.locals.status = 'success';
      console.log(`exportFrames : proc.on('close')`);
      next();
    });
  }


  public renderMosaic  (req: Request, res: Response, next: any) {

    const duration = 6.0;
    const frameInterval = duration / 19;
    console.log(`\n\nframeInterval=${frameInterval}`);
    const bgFrameStart = req.body.currentScrubberFrame * frameInterval;
    const filterParams = {
      panelCount: req.body.numTiles,
      sequenceCount: req.body.numTiles > 4 ? 3 : 4,
      fadeInToOutDuration: 2.0,
      outputDuration: 15.0,
      outputSize: '1080x1080',
      bgFrameStart,
      bgFrameHue: ', hue=s=0.1',
      preCropStr: '',
      inputHeight: 480,
      inputWidth: 480,
      inputDuration: 7.0,
    }

    const assetID = req.body.assetID;
    const inputPath  = `${env.getVolumnPath()}/uploads/${assetID}.mov`; 
    const outputDirectory = `${env.getVolumnPath()}/public/${assetID}`; 
    const outputPath = `${outputDirectory}/mosaic.mov`; 
    const ffmpegFilterComplexStr = createFfmpegFilterComplexStr(filterParams);
    console.log(`\n\nffmpegFilterComplexStr=${ffmpegFilterComplexStr}\n\n`);

    const proc = spawn(ffmpegPath, ['-i', inputPath, '-filter_complex', ffmpegFilterComplexStr, '-map', '[final]', '-an', '-y', outputPath]);
    proc.stdout.on('data', function(data) {
      console.log(`proc.stdout.on('data'): ${data}`);
    });
    proc.stderr.setEncoding("utf8")
    proc.stderr.on('data', function(data) {
      console.log(`proc.stderr.on('data'): ${data}`);
    });
    proc.on('close', function() {
      res.locals.status = 'success';
      console.log(`renderMosaic : proc.on('close')`);
      next();
    });
  }




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

}