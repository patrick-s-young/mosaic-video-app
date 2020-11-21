import * as React from 'react';
import { useState } from 'react';
import 'app/app.css';



const App: React.FC = () => {
  const [ videoData, setVideoData ] = useState<string>();

  ////////// uploadVideo ///////
  function uploadVideo (event) {
    const files = event.target.files    
    const formData = new FormData()
    formData.append('myFile', files[0]);
    formData.append('screenWidth', window.screen.width);
    
    fetch('http://localhost:3001/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => setVideoData(data.vidSrc))
    .catch(error => {
      console.error(error)
    })
  }

  console.log(`videoData: ${videoData}`)

  ////////// return ////////////
  return (
    <div>
      {videoData == undefined
        ? <div>
            <label>UPLOAD VIDEO</label>
            <input id="myFile" type="file" onChange={uploadVideo} ></input>
          </div>
        : <div>
            <video src={`http://localhost:3001/upload/${videoData}`} webkit-playsinline='true' playsInline={true} muted autoPlay loop />
          </div>
      }
    </div>
  );
}

export default App;

