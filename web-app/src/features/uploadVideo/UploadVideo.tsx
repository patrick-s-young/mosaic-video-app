import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setVideoIsUploaded, setVideoIsPreloaded, setImagesArePreloaded } from 'features/uploadVideo/uploadSlice';
import { setNavSection } from 'features/navigation/navSlice';
import type { NavState, NavSection } from 'features/navigation/navSlice';
import type { RootState } from 'app/rootReducer';
import type { UploadState, VideoIsUploaded, VideoIsPreloaded, ImagesArePreloaded } from 'features/uploadVideo/uploadSlice';
import { preloadSequentialImages, preloadVideo, uploadFile } from 'utils';

export const UploadVideo: React.FC = () => {
  const dispatch = useDispatch();
  const { videoIsUploaded, 
          videoIsPreloaded, 
          imagesArePreloaded, 
          assetID } = useSelector<RootState, UploadState>((state) => state.upload);


  function onVideoIsUploaded (assetID: string) {
    dispatch(setVideoIsUploaded({ videoIsUploaded: true, assetID }));
  }

  function onVideoIsPreloaded (videoURL: string) {
    dispatch(setVideoIsPreloaded({ videoIsPreloaded: true, videoURL }));
  }

  function onImagesArePreloaded (imageURLs: Array<string>) {
    dispatch(setImagesArePreloaded({ imagesArePreloaded: true, imageURLs }));
    dispatch(setNavSection({navSection: 'Edit Mosaic'}));
  }

  function onFormSubmit (event) {
    uploadFile(event.target.files[0], 'http://0.0.0.0:3001/file/upload')
      .then(assetID => onVideoIsUploaded(assetID))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    if (videoIsUploaded && !videoIsPreloaded) {
      const videoPath = `http://0.0.0.0:3001/${assetID}/resized.mov`;
      preloadVideo(videoPath)
        .then(videoURL => onVideoIsPreloaded(videoURL))
        .catch(err => console.log(`ERROR: ${err}`));
    }
  }, [videoIsPreloaded, videoIsUploaded, assetID]);

  useEffect(() => {
    if (videoIsUploaded && !imagesArePreloaded) {
      preloadSequentialImages({
        startIdx: 1,
        endIdx: 20,
        nameFormat: 'img .jpg',
        zeroPadding: 3,
        directoryPath: `http://0.0.0.0:3001/${assetID}`
      })
        .then(imageURLs => onImagesArePreloaded(imageURLs))
        .catch(err => console.log(`ERROR: ${err}`));
    }
  }, [imagesArePreloaded, videoIsUploaded, assetID]);


  return (
    <div>
      {!videoIsUploaded &&
        <div style={{marginTop: '300px'}}>
          <label>UPLOAD VIDEO</label>
          <input id="myFile" type="file" onChange={onFormSubmit} ></input>
        </div>
      }
    </div>
  )
}