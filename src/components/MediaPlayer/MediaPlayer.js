import React, { useRef, useState } from "react";
import BoxSkip from "./components/BoxSkip/BoxSkip";
import FooterOptions from "./components/FooterOptions/FooterOptions";
import PlayPause from "./components/PlayPause/PlayPause";
import Skip from "./components/Skip/Skip";
import "./styles.css";

const MediaPlayer = () => {
  let refOptions = useRef(),
    refVideo = useRef(),
    refMedia=useRef();

  // Play and pause of video
  const [src_svg, setSrc_svg] = useState("./assets/play.svg");
  const play_pause = (e) => {
    if (e.target.className === "options" || e.target.className === "play_pause" || e.target.alt === "Play or Pause") {
      if (src_svg === "./assets/play.svg") {
        setSrc_svg("./assets/pause.svg");
        refVideo.current.play();
      } else {
        setSrc_svg("./assets/play.svg");
        refVideo.current.pause();
      }
    }
  };

  let timeout;
  const appearOptions = () => {
    clearTimeout(timeout);
    refOptions.current.style.opacity = "1";
    timeout = setTimeout(function () {
      refOptions.current.style.opacity = "0";
    }, 10000);
  };

  return (
    <div className="media_player" ref={refMedia}>
      <video ref={refVideo}>
        <source src="./videos/prueba.mp4" type="video/mp4"></source>
      </video>
      <div
        className="options"
        ref={refOptions}
        onMouseMove={appearOptions}
        onClick={play_pause}
      >
        <BoxSkip
          class_name="box_skip_previous"
          src_img="./assets/skip_previous.svg"
          alt_img="Skip Previous"
        ></BoxSkip>
        <PlayPause src_img={src_svg}></PlayPause>
        <BoxSkip
          class_name="box_skip_next"
          src_img="./assets/skip_next.svg"
          alt_img="Skip Next"
        ></BoxSkip>
        <Skip message="Saltar Opening"></Skip>

        <FooterOptions ref_video={refVideo} ref_media={refMedia} ></FooterOptions>
      </div>
    </div>
  );
};

export default MediaPlayer;
