import * as React from 'react';
import { Navigation } from 'features/navigation'; 
import { UploadVideo } from 'features/uploadVideo/UploadVideo';
import { RenderMosaic } from 'features/renderMosaic/RenderMosaic';
import Scrubber from 'features/mosaicImage/Scrubber';
import ScrubberSlider from 'features/mosaicImage/ScrubberSlider';
import { MosaicTiles, MosaicSelector } from 'features/mosaicVideo';
import { useSelector } from 'react-redux';
import type { RootState } from 'app/rootReducer';
import type { NavState } from 'features/navigation/navSlice';
import 'app/app.css';



const App: React.FC = () => {
  const { navSection } = useSelector<RootState, NavState>((state) => state.nav);

  return (
    <div style={{height: '700px', width: '480px', borderStyle: 'dashed', borderColor: 'aquamarine', borderWidth: '2px'}}>
      <div style={{height: '600px', width: '100%', borderStyle: 'dashed', borderColor: 'red', borderWidth: '2px'}}>
    



      { navSection === 'Upload Video' && 
        <div style={{height: '600px', width: '100%', borderStyle: 'dashed', borderColor: 'green', borderWidth: '2px'}}>
          <UploadVideo />
        </div>
      }
    


      { navSection === 'Edit Mosaic' &&
        <div>
          <div style={{height: '480px', width: '100%', borderStyle: 'dashed', borderColor: 'yellow', borderWidth: '2px'}} >
            <Scrubber />
            <MosaicTiles />
          </div>
          <div style={{height: '50px', width: '100%', borderStyle: 'dashed', borderColor: 'brown', borderWidth: '2px'}} >
            <ScrubberSlider />
          </div>
          <div style={{height: '80px', width: '100%', borderStyle: 'dashed', borderColor: 'pink', borderWidth: '2px'}}>
            <MosaicSelector />
          </div>
        </div>
      }

      { navSection === 'Render Mosaic' && 
        <div style={{height: '600px', width: '100%', borderStyle: 'dashed', borderColor: 'green', borderWidth: '2px'}}>
          <RenderMosaic />
        </div>
      }

      </div>
      <div style={{height: '80px', width: '100%', borderStyle: 'dashed', borderColor: 'purple', borderWidth: '2px'}}>
        <Navigation />
      </div>
    </div>
  );
}

export default App;

