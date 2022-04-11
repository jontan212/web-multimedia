import React, { useState, useEffect } from "react";
import "./styles.css";

const FooterOptions = ({ ref_video, ref_media }) => {
  const [totalTime, setTotalTime] = useState(),
    [currentTime, setCurrentTime] = useState();

  useEffect(() => {
    // TOTAL DURATION OF THE VIDEO
    ref_video.current.onloadeddata = () =>
      setTotalTime(convertion(ref_video.current.duration));

    // CURRENT TIME OF THE VIDEO
    setCurrentTime(convertion(ref_video.current.currentTime));
    ref_video.current.ontimeupdate = () => {
      setCurrentTime(convertion(ref_video.current.currentTime));
    };
  }, []);

  // MUTED
  const muted = () => {
    if (!ref_video.current.muted) {
      ref_video.current.muted = true;
    } else {
      ref_video.current.muted = false;
    }
  };

  // FULL SCREEN
  const fullScreen = () => {
    if (!document.fullscreenElement) {
      if (ref_media.current.requestFullscreen)
        ref_media.current.requestFullscreen();
      else if (ref_media.current.mozRequestFullScreen)
        ref_media.current.mozRequestFullScreen();
      else if (ref_media.current.webkitRequestFullscreen)
        ref_media.current.webkitRequestFullscreen();
      else if (ref_media.current.msRequestFullscreen)
        ref_media.current.msRequestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
    }
  };

  // CONVERTION TIME
  const convertion = (seconds) => {
    let time = ``;

    const segundos = Math.round(seconds % 60);
    time = segundos <= 9 ? "0" + segundos : segundos;

    const minutos = Math.floor(seconds / 60) % 60;
    time = minutos <= 9 ? "0" + minutos + ":" + time : minutos + ":" + time;

    const horas = Math.floor(seconds / 3600);

    return horas === 0
      ? time
      : (time = horas <= 9 ? "0" + horas + ":" + time : horas + ":" + time);
  };

  // POINTER
  const pointer = (e) => {
    console.log(e.clientX);
    // console.log(e.offsetX);
  };

  return (
    <div className="footer_options">
      <Btn src_img="./assets/volume.svg" alt_img="Volume" fc={muted}></Btn>
      <div className="container-progress-bar">
        <span>{currentTime}</span>
        <div className="progress" onMouseMove={pointer}>
          <div className="pointer"></div>
        </div>
        <span>{totalTime}</span>
      </div>
      <Btn
        src_img="./assets/fullscreen.svg"
        alt_img="Volume"
        fc={fullScreen}
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
