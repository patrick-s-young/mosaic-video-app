const { fstat, rename } = require('fs');
const path = require('path');
const uploadVideoDirectory  = path.resolve(__dirname, '../uploads');

module.exports.uploadVideo = function(req, res, next) 
{
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) 
  {
    res.status(400).send('No files were uploaded.');
    return;
  }

  console.log('req.files >>>', req.files); // eslint-disable-line
 

  sampleFile = req.files.myFile;

  //uploadPath = `${uploadVideoDirectory}/${sampleFile.name}`;
  const uploadedFileName = `upload_${Date.now()}.mov`;
  uploadPath = `${uploadVideoDirectory}/${uploadedFileName}`;
  console.log(`uploadPath: ${uploadPath}`)
  sampleFile.mv(uploadPath, function(err) 
  {
    if (err) 
    {
      return res.status(500).send(err);
    }

    res.locals.fileName = uploadedFileName;
    next(); 
  });
}



