import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit, onDemoChange, imageFetched}) => {
  const errorText = imageFetched ? "" : "Error fetching image, make sure your image url is valid";
  return(
    <div>
      <p className="f3 light-gray mb2">
        {'This app will detect faces in your pictures. Give it a try!'}
      </p>
      <p className="f6 light-gray mt0 mb0">
        {'input an image URL ending with .jpg, .jpeg or .png,'}
      </p>
      <p className="f6 light-gray mt0">
        {'or select a demo image below and click Detect'}
      </p>
      <div className="errorText">
        {errorText}
      </div>
      <div className="center">
        <div className="center form pa3 br3 shadow-5">
          <input id="urlInput"className="f4 pa2 w-70 center"type="text" placeholder="Insert image url"
          onChange={onInputChange}/>
          <button className="w-30 grow f4 link ph3 pv2 dib light-gray bg-dark-gray pointer"
          onClick={onButtonSubmit}>
            Detect
          </button>
        </div>
      </div>
        <select defaultValue={'DEFAULT'} onChange={onDemoChange} className="dropdown-select mt2">
          <option value="DEFAULT" disabled>Demo images</option>
          <option value="https://samples.clarifai.com/face-det.jpg">Image 1</option>
          <option value="https://samples.clarifai.com/family.jpg">Image 2</option>
          <option value="https://samples.clarifai.com/model-gallery/images/age-003.jpg">Image 3</option>
        </select>
    </div>
  );
}

export default ImageLinkForm;