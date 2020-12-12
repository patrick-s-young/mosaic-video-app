import * as React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from 'app/rootReducer';
import type { UploadState } from 'features/uploadVideo/uploadSlice';
import type { MosaicState } from 'features/mosaicVideo/mosaicSlice';
import type { ScrubberState } from 'features/mosaicImage/scrubberSlice';

const axios = require('axios');
const FileDownload = require('js-file-download');

export const RenderMosaic: React.FC = () => {
  const { assetID } = useSelector<RootState, UploadState>((state) => state.upload);
  const { numTiles } = useSelector<RootState, Partial<MosaicState>>((state) => state.mosaic);
  const { currentScrubberFrame } = useSelector<RootState, ScrubberState>((state) => state.scrubber);

  function onClickHandler (assetID: string) {
    axios({
      url: `http://0.0.0.0:3001/render/mosaic/?assetID=${assetID}&numTiles=${numTiles}&currentScrubberFrame=${currentScrubberFrame}`,
      method: 'GET',
      responseType: 'blob'
    }).then((response) => {
        FileDownload(response.data, 'mosaic_render.mov');
    });
  }

  return (
    <div>
        <div style={{marginTop: '300px'}}>
          <label>RENDER MOSAIC</label>
          <button type='button' onClick={() => onClickHandler(assetID)}>Render Mosaic</button>
        </div>
    </div>
  )
}