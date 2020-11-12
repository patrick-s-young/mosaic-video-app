const spawn = require('child_process').spawn;
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const { createPtsFilter } = require('./cinepic-modules/pts');
const { createTrimFilter } = require('./cinepic-modules/trim');
const { createOverlayFilter } = require('./cinepic-modules/overlay');
const path = require('path');
const ffprobe = require('ffprobe');
const ffprobeStatic = require('ffprobe-static');

///////////
// INPUT PARAMS
let panelCount = 0;
let sequenceCount = 0;
const fadeInToOutDuration = 2.0;
const outputDuration = 15.0;
const outputSize = '1080x1080';
const outputScale = '1080:1080';
const bgFrameStart = 1.0;
const bgFrameHue = ', hue=s=-5';
//let inputPath = '';
//et outputFilename = 'cinepic_rendered_002.mp4';
//const outputPath = path.join(__dirname, `../renders/${outputFilename}`);

let preCropStr = '';
// set by ffprobe
let inputDuration = 0; 
let inputWidth = 0;
let inputHeight = 0;
const panelCountByGridId = {
  grid2: { panelCount: 2, sequenceCount: 4 },
  grid3: { panelCount: 3, sequenceCount: 4 },
  grid4: { panelCount: 4, sequenceCount: 4 },
  grid6: { panelCount: 6, sequenceCount: 3 },
  grid9: { panelCount: 9, sequenceCount: 3 }
}


/////////////////////////////////
// FFMPEG -filter_complex STRING
module.exports.renderCinepic = function (req, res, next) {
  console.log(`in renderCinepic with req.body.renderGridId: ${req.body.renderGridId}, req.body.renderVideoFileName: ${req.body.renderVideoFileName}`);
  panelCount    = panelCountByGridId[req.body.renderGridId].panelCount;
  sequenceCount = panelCountByGridId[req.body.renderGridId].sequenceCount;
  console.log(`panelCount: ${panelCount}, sequenceCount: ${sequenceCount}`);
  const outputFileName = 'debug_render_test.mp4'; //`rendered_${req.body.renderVideoFileName}`;
  const inputPath  = path.resolve(__dirname, `../uploads/${req.body.renderVideoFileName}`);
  const outputPath = path.resolve(__dirname, `../../client/assets/video/${outputFileName}`);
  let ffmpegFilterComplexStr = '';


  ffprobe(inputPath, { path: ffprobeStatic.path })
    .then(function (info, err) {
      if (err) return console.log(`Error ${err}`);
      inputDuration = info.streams[0].duration;
      inputWidth = info.streams[0].width;
      inputHeight = info.streams[0].height;
      ffmpegFilterComplexStr = createFfmpegFilterComplexStr();
      const proc = spawn(ffmpegPath, ['-i', inputPath, '-filter_complex', ffmpegFilterComplexStr, '-map', '[final]', '-an', '-y', outputPath]);

      proc.stdout.on('data', function(data) {
         // console.log(data);
      });

      proc.stderr.setEncoding("utf8")
      proc.stderr.on('data', function(data) {
          console.log(data);
      });

      proc.on('close', function() {
          console.log('finished');
          //res.locals.outputFilename = outputFilename;
          next();
      });
    });
}













function createFfmpegFilterComplexStr () {
  let ffmpegFilterComplexStr = '';

  /////////////////////
  // PRE CROP TO SQUARE
  if (inputHeight < inputWidth) {
    let offsetY = (inputWidth - inputHeight) / 2;
    preCropStr = `crop=1080:1080:0:${offsetY}, `;
  }

  /////////////////////////////
  // CREATE BASE AND BG
  //  ffmpegFilterComplexStr += `nullsrc=size=${outputSize}:duration=${outputDuration} [base];\n`;
  ffmpegFilterComplexStr += `nullsrc=size=${outputSize}:duration=${outputDuration} [base];\n`;
  //ffmpegFilterComplexStr += `[0:v] scale=${outputScale}, trim=start=${bgFrameStart}:duration=0.05, setpts=PTS-STARTPTS${bgFrameHue} [bg_frame];\n`;
  ffmpegFilterComplexStr += `[0:v] ${preCropStr}trim=start=${bgFrameStart}:duration=0.05, setpts=PTS-STARTPTS${bgFrameHue} [bg_frame];\n`;
 ffmpegFilterComplexStr += `[base][bg_frame] overlay [bg];\n`;


  ////////////////////////////////////////
  // TRIM, SCALE, CROP, SETPTS, FADE IN, FADE OUT
  const trimInterval = (inputDuration - fadeInToOutDuration) / (panelCount - 1);
  ffmpegFilterComplexStr += createTrimFilter(panelCount, trimInterval, preCropStr);

  /////////////////////////////////////////
  // SPLIT
  let panelCounter = 0;
  let copyCount = sequenceCount;
  let splitFilterStr = '';
  for (; panelCounter < panelCount; panelCounter++) {
    splitFilterStr += `[trim.${panelCounter}] split=${copyCount} `;
    for (let copyCounter = 0; copyCounter < copyCount; copyCounter++) {
      splitFilterStr += `[split.${panelCounter}.${copyCounter}]`;
    }
    splitFilterStr += ';\n';
  }
  ffmpegFilterComplexStr += splitFilterStr;


  ////////////////////////////////////////////////////////
  // PRESENTATION TIMESTAMP
  ffmpegFilterComplexStr += createPtsFilter(panelCount);


  ////////////////////////
  // OVERLAY
  ffmpegFilterComplexStr += createOverlayFilter(panelCount, sequenceCount);

  return ffmpegFilterComplexStr;
}

const uploadVideoDirectory  = path.resolve(__dirname, '../uploads');
const resizedVideoDirectory = path.resolve(__dirname, '../../client/assets/video');

/////////////////////////
/////////////////////////
////////////////////////
// RESIZE VIDEO ///////
module.exports.resizeVideo  = function (req, res, next) {
  console.log('in resized video');

  let inputPath  = `${uploadVideoDirectory}/${res.locals.fileName}`; 
  let outputPath = `${resizedVideoDirectory}/${res.locals.fileName}`;
  console.log(`inputPath: ${inputPath}`);
  console.log(`outputPath: ${outputPath}`);
  let screenWidth = parseInt(req.body.screenWidth);
  screenWidth -= screenWidth % 2;
  console.log(`req.body.screenWidth: ${req.body.screenWidth}, screenWidth: ${screenWidth}`)
// DEBUG
screenWidth = 540;

  const proc = spawn(ffmpegPath, ['-i', inputPath, '-filter_complex', `[0:v] scale=${screenWidth}:-1 [final]` , '-map', '[final]', '-an', '-y', outputPath]);

  proc.stdout.on('data', function(data) {
      //console.log(data);
  });

  proc.stderr.setEncoding("utf8")
  proc.stderr.on('data', function(data) {
      console.log(data);
  });

  proc.on('close', function() {
      console.log('finished');

     
      //res.locals.outputPath = outputPath;
      next();
  });
}

/////////////////////////
/////////////////////////
////////////////////////
// VIDEO PROPERTIES ///
module.exports.videoProperties = function (req, res, next) {

  let outputPath = `${resizedVideoDirectory}/${res.locals.fileName}`;

  ffprobe(outputPath, { path: ffprobeStatic.path })
    .then(function (info, err) {
      if (err) return console.log(`Error ${err}`);
      res.locals.vidLength = info.streams[0].duration;
      res.locals.vidWidth = info.streams[0].width;
      res.locals.vidHeight = info.streams[0].height;
      next();
    });

}