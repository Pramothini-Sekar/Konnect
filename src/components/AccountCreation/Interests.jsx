import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import ImagePicker from 'react-image-picker';
import Masonry from "react-masonry-component";
import { masonryOptions } from "../../exports";

import './Interests.scss';

import tickmark from '../../assets/tickmark.jpg';
import next from '../../assets/next.png';

const Interests = (props) => {

  //Modal State Variable
  const [showCompletion, setShowCompletion] = useState(false);

  const [interestsArray, setInterestsArray] = useState(props.interests);

  function handleSaveDetails() {
    props.persistDetails(interestsArray);
    setShowCompletion(true);
  }

  function handlePrevious() {
    props.prevStep();
  }

  function acceptAck() {
    setShowCompletion(false);
  }

  function onPick(interestsChosen) {
    console.log("Showing interest obj ", interestsChosen);
    let index, interestsValue = [];
    for (index = 0; index < interestsChosen.length; index++) {
      interestsValue[index] = interestsChosen[index].value;
    }
    setInterestsArray(interestsValue);
  }

  return (
    <div className="Interests">
      <img className="Prev" src={next} onClick={handlePrevious} alt="Previous" />
      <img className="Next" src={next} onClick={handleSaveDetails} alt="Save&amp;Continue" />
      <div className="interest-set">
        <h4>Choose five categories that represent your hobbies</h4>
        <Masonry
          className={"grid"}
          elementType={"div"}
          options={masonryOptions}
          disableImagesLoaded={false}
          updateOnEachImageLoad={false}
        >
          <div id="grid_div" className="grid-cols">
            <ImagePicker
              images={props.interests.map((interest, i) => ({ src: interest.img, value: interest }))}
              onPick={onPick}
              multiple
            />
          </div>
        </Masonry>
      </div>
      {showCompletion && <Modal dialogClassName="completion-modal" centered animation={false} show={showCompletion} onHide={acceptAck}>
        <Modal.Body>
          <div className="completion-modal-title">
          BRAVO!
          </div>
          <div className="completion-modal-content">
          Your profile has been created
          </div>
          <div className="completion-modal-image">
          <img src={tickmark} alt="Tick" onClick={acceptAck} style={{ width: "50px", height: "50px" }} />
          </div>
        </Modal.Body>
      </Modal>}
    </div>
  );


}
export default Interests;
