import * as React from 'react';
import { useState } from 'react';
import { Navigation } from 'features/navigation'; 
import 'app/app.css';



const App: React.FC = () => {
  /*
  const [ videoSrc, setVideoSrc ] = useState<string>();

  ////////// uploadVideo ///////
  function uploadVideo (event) {
    const files = event.target.files    
    const formData = new FormData()
    formData.append('myFile', files[0]);
    formData.append('screenWidth', window.screen.width);
    
    fetch('http://localhost:3001/file/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => setVideoSrc(data.filename))
    .catch(error => {
      console.error(error)
    })
  }

  console.log(`videoSrc: ${videoSrc}`)
  */

  ////////// return ////////////
  return (
    <div>
      {videoSrc == undefined
        ? <div>
            <label>UPLOAD VIDEO</label>
            <input id="myFile" type="file" onChange={uploadVideo} ></input>
          </div>
        : <div>
            <video src={`http://localhost:3001/resize/${videoSrc}`} webkit-playsinline='true' playsInline={true} muted autoPlay loop />
          </div>
      }
    </div>
  );
}

export default App;

