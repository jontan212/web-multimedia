import React from "react";
import "./styles.css";

const PlayPause = (props) => {
  return (
    <div className="play_pause">
      <img src={props.src_img} alt="Play or Pause"></img>
    </div>
  );
};

export default PlayPause;
