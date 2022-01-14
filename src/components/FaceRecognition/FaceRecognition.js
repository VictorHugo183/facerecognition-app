import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box}) => {
  return(
    <div className="center ma">
      <div className="absolute mt2">
        <img id="inputImage"src={imageUrl} width="500px" height="auto" alt=""/>
        {/* for a single bounding box: */}
        {/* <div className="bounding-box"
        style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div> */}

        {/* For multiple bounding boxes, loop through the box prop and set styles according to the current element */}
        {box.map((item, i) => (
          <div key={"key"+i} className="bounding-box" style={{
            top: box[i].top_row, right: box[i].right_col, bottom: box[i].bottom_row, left: box[i].left_col
          }}> 
          </div>
        ))
        }
      </div>
    </div>
  );
}

export default FaceRecognition;