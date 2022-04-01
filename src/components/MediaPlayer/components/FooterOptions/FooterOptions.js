import React from "react";
import "./styles.css";

const FooterOptions = ({ ref_video, ref_media }) => {
  const muted = () => {
    if (!ref_video.current.muted) {
      ref_video.current.muted = true;
    } else {
      ref_video.current.muted = false;
    }
  };

  const openFullScreen = () => {
    if (!document.fullscreenElement) {
      // ref_media.current.requestFullscreen();
      if (ref_media.current.requestFullscreen)
        ref_media.current.requestFullscreen();
      else if (ref_media.current.mozRequestFullScreen)
        ref_media.current.mozRequestFullScreen();
      else if (ref_media.current.webkitRequestFullscreen)
        ref_media.current.webkitRequestFullscreen();
      else if (ref_media.current.msRequestFullscreen)
        ref_media.current.msRequestFullscreen();
    } else {
      // document.exitFullscreen();
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
    }
  };

  return (
    <div className="footer_options">
      <Btn src_img="./assets/volume.svg" alt_img="Volume" fc={muted}></Btn>
      <div></div>
      <Btn
        src_img="./assets/fullscreen.svg"
        alt_img="Volume"
        fc={openFullScreen}
      ></Btn>
      <Btn src_img="./assets/settings.svg" alt_img="Volume"></Btn>
    </div>
  );
};

const Btn = ({ src_img, alt_img, fc }) => {
  return (
    <button onClick={fc}>
      <img src={src_img} alt={alt_img}></img>
    </button>
  );
};

export default FooterOptions;
