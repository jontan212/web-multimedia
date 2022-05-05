import React, { useState, useEffect, useRef } from "react";
import "./styles.css";

const FooterOptions = ({ ref_video, ref_media }) => {
  const refInputRange = useRef();
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

  useEffect(() => {
    // ON TIME UPDATE
    ref_video.current.ontimeupdate = () => {
      let percentage =
        (100 * ref_video.current.currentTime) / ref_video.current.duration;
      // console.log(percentage);
      // 100 / 23
      // 500 / x

      refInputRange.current.setAttribute("value", (1000 * percentage)/ 100);

      refInputRange.current.style.backgroundImage = `-webkit-gradient(linear, left top, right top,
      color-stop(${percentage}%, #FFFFFF),
      color-stop(${percentage}%, #9B9B9B)`;
      refInputRange.current.style.backgroundImage = `-moz-linear-gradient(left center, #FFFFFF 0%, #FFFFFF ${percentage}%, #9B9B9B ${percentage}%, #9B9B9B 100%)`;
    };
  }, [ref_video]);

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

  // INPUT RANGE
  const range = (e) => {
    let val = (e.target.value - e.target.min) / (e.target.max - e.target.min);
    let percent = val * 100;
    e.target.style.backgroundImage = `-webkit-gradient(linear, left top, right top,
      color-stop(${percent}%, #FFFFFF),
      color-stop(${percent}%, #9B9B9B)`;
    e.target.style.backgroundImage = `-moz-linear-gradient(left center, #FFFFFF 0%, #FFFFFF ${percent}%, #9B9B9B ${percent}%, #9B9B9B 100%)`;
  };

  // ON TIME UPDATE
  const timeUpdate = () => {
    // ref_video.current.setAttribute('value', percentage);
    // console.log(ref_video.current);
    // ref_video.current.setAttribute('value', `${percentage}`);
    // e.target.setAttribute('value', percentage);
  };

  return (
    <div className="footer_options">
      <Btn src_img="./assets/volume.svg" alt_img="Volume" fc={muted}></Btn>
      <div className="container-progress-bar">
        <span>{currentTime}</span>
        <input
          type="range"
          min="0"
          max="1000"
          // defaultValue="0"
          onMouseMove={range}
          onChange={timeUpdate}
          style={{
            backgroundImage:
              "-webkit-gradient(linear, 0% 0%, 100% 0%, from(rgb(255, 255, 255)), from(rgb(155, 155, 155)))",
          }}
          ref={refInputRange}
        ></input>
        {/* <div className="progress">
          <div
            className="pointer"
            onMouseDown={pointer}
            onMouseUp={des}
            style={{ left: `${left}px` }}
          ></div>
        </div> */}
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
