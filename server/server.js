const express = require('express');
const app = express();
const http = require('http').createServer(app);
const fileUpload = require('express-fileupload');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
////
const renderController = require('./controllers/renderController');
const uploadController = require('./controllers/uploadController');
////
const PORT = 3000;
////
app.use(fileUpload());
app.use(bodyParser.json());
app.use(cookieParser());

// DEFAULT
app.get('/', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

// CLIENT PATH FOR RENDERED VIDEO
app.use('/video', express.static(path.resolve(__dirname, '../client/assets/video')));



// UPLOAD VIDEO
app.post('/upload', uploadController.uploadVideo, renderController.resizeVideo, renderController.videoProperties, (req, res) => {
  const videoSrc = `${res.locals.fileName}`;

  console.log(`videoSrc: ${videoSrc}`)
   res.json({ vidSrc: res.locals.fileName, 
              vidWidth: res.locals.vidWidth, 
              vidHeight: res.locals.vidHeight,
              vidLength: res.locals.vidLength});
});



// RENDER
app.post('/render', renderController.renderCinepic, function (req, res) {

  res.json({renderedVidSrc: 'debug_render_test.mp4'});
});



// RETURN RENDERED VIDEO FOR DOWNLOAD
app.get('/download', (req, res) => {
  console.log(`download called with req.query.id: ${req.query.id}`);
  const fileName = 'debug_render_test.mp4';
  const filePath = path.resolve(__dirname, `../client/assets/video/${fileName}`);

  res.download(filePath, 'downloaded-video.mp4'); // Set disposition and send it.
});


http.listen(PORT, () => { console.log(`Listening port ${PORT}`); });