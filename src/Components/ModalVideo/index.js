import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import ReactPlayer from "react-player";

const ModalVideo = (props) => {
  const { modalVideo, setModalVideo, modalVideoUrl } = props;

  return (
    <div className="modalVideo">
      <Modal
        isOpen={modalVideo}
        toggle={setModalVideo}
        style={{ backgroundColor: "black" }}
      >
        <ModalHeader
          toggle={setModalVideo}
          style={{
            backgroundColor: "black",
            zIndex: "1",
          }}
        ></ModalHeader>
        <ModalBody
          style={{
            backgroundColor: "black",
          }}
        >
          <ReactPlayer
            width="480px"
            height="240px"
            controls
            playing={true}
            loop={true}
            url={modalVideoUrl}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProp = (state) => {
  return {
    modalVideo: state.homeTemplateReducer.modalVideo,
    modalVideoUrl: state.homeTemplateReducer.modalVideoUrl,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    setModalVideo: (url) => {
      const action = {
        type: "SET_MODAL_VIDEO",
        payload: url,
      };
      dispatch(action);
    },
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(ModalVideo);
