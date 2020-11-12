import * as React from 'react';
import 'app/app.css';

const App: React.FC = () => {

  ////////// uploadVideo ///////
  function uploadVideo (event) {
    const files = event.target.files    
    const formData = new FormData()
    formData.append('myFile', files[0]);
    formData.append('screenWidth', window.screen.width);
  
    fetch('/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => {
      console.error(error)
    })
  }


  ////////// return ////////////
  return (
    <div>
        <label>UPLOAD VIDEO</label>
        <input id="myFile" type="file" onChange={uploadVideo} ></input>
    </div>
  );
}

export default App;