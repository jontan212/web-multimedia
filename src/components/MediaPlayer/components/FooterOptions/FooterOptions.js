import React, { useState, useEffect, useRef } from "react";
import "./styles.css";

const FooterOptions = ({ ref_video, ref_media, setSrc_svg }) => {
  const refContainer = useRef(),
    refProgress = useRef(),
    refPointer = useRef(),
    refOnMinute = useRef();

  const [totalTime, setTotalTime] = useState(),
    [currentTime, setCurrentTime] = useState(),
    [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    // TOTAL DURATION OF THE VIDEO
    ref_video.current.onloadeddata = () =>
      setTotalTime(convertion(ref_video.current.duration));

    // CURRENT TIME OF THE VIDEO
    setCurrentTime(convertion(ref_video.current.currentTime));
    ref_video.current.ontimeupdate = () => {
      setCurrentTime(convertion(ref_video.current.currentTime));
      if (ref_video.current.currentTime === ref_video.current.duration) {
        setSrc_svg("./assets/play.svg");
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isMouseDown) {
      let progressInfo = refProgress.current.getBoundingClientRect();
      // ON TIME UPDATE
      let positionBG =
        (progressInfo.width * ref_video.current.currentTime) /
        ref_video.current.duration;
      refProgress.current.setAttribute(
        "style",
        `background-image: linear-gradient(to right ,white ${positionBG}px, black -100%);`
      );

      if (
        positionBG > 7 &&
        positionBG < progressInfo.width - refPointer.current.clientWidth / 2
      ) {
        refPointer.current.style.left = `${
          positionBG - refPointer.current.clientWidth / 2
        }px`;
      }

      if (positionBG <= refPointer.current.clientWidth / 2) {
        refPointer.current.setAttribute("style", "left: 0px");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTime]);

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

  // MOVE POINTER TO A POINT ON THE PROGRESS BAR
  const moveToPosition = (e) => {
    let progressInfo = refProgress.current.getBoundingClientRect();

    let pointerPosition = e.pageX - refContainer.current.offsetLeft;

    if (pointerPosition > 7 && pointerPosition < progressInfo.width - 7) {
      refPointer.current.setAttribute(
        "style",
        "left: " + (pointerPosition - 7) + "px"
      );
    }

    if (pointerPosition <= 7) {
      refPointer.current.setAttribute("style", "left: 0px");
    }

    if (pointerPosition >= refProgress.current.clientWidth - 7) {
      refPointer.current.setAttribute(
        "style",
        "left: " +
          (refProgress.current.clientWidth - refPointer.current.clientWidth) +
          "px"
      );
    }

    refProgress.current.setAttribute(
      "style",
      `background-image: linear-gradient(to right ,white ${pointerPosition}px, black -100%);`
    );

    // Here, I calculate the second I'm going to jump into the video
    ref_video.current.currentTime =
      (pointerPosition * ref_video.current.duration) /
      refProgress.current.clientWidth;
  };

  // POINTER FOLLOW THE MOUSE
  const pointerFollowsCursor = (e) => {
    let progressInfo = refProgress.current.getBoundingClientRect();
    let pointerPosition = e.pageX - refContainer.current.offsetLeft;

    refProgress.current.setAttribute(
      "style",
      `background-image: linear-gradient(to right ,white ${
        e.pageX - progressInfo.x
      }px, black -100%);`
    );

    if (pointerPosition > 7 && pointerPosition < progressInfo.width - 7) {
      refPointer.current.setAttribute(
        "style",
        `left: ${e.pageX - 8 - progressInfo.x}px;`
      );

      refOnMinute.current.setAttribute(
        "style",
        `left: ${pointerPosition - refOnMinute.current.clientWidth / 2}px;`
      );
    }

    if (e.pageX <= progressInfo.x) {
      refPointer.current.setAttribute("style", "left: 0px;");
    }

    if (e.pageX >= progressInfo.right) {
      refPointer.current.setAttribute(
        "style",
        `left: ${
          refProgress.current.clientWidth - refPointer.current.clientWidth
        }px;`
      );
    }

    // Here, I calculate the second I'm going to jump into the video while move the cursor
    ref_video.current.currentTime =
      ((e.pageX - progressInfo.x) * ref_video.current.duration) /
      refProgress.current.clientWidth;
  };

  const leftClickEvent = (e) => {
    const remove = () => {
      document.removeEventListener("mousemove", pointerFollowsCursor);
      document.body.removeAttribute("style");
      setIsMouseDown(false);
      refOnMinute.current.classList.toggle("visible");
      document.removeEventListener("mouseup", remove);
    };

    if (e.buttons === 1) {
      refOnMinute.current.classList.toggle("visible");
      document.addEventListener("mouseup", remove);

      setIsMouseDown(true);
      document.body.setAttribute(
        "style",
        "-webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;"
      );
      moveToPosition(e);
      document.addEventListener("mousemove", pointerFollowsCursor);
    }
  };

  const eventOnMinute = (e) => {
    let pointerPosition = e.pageX - refContainer.current.offsetLeft;
    refOnMinute.current.setAttribute(
      "style",
      `left: ${pointerPosition - refOnMinute.current.clientWidth / 2}px;`
    );

    let text = convertion(
      (pointerPosition * ref_video.current.duration) /
        refProgress.current.clientWidth
    );
    refOnMinute.current.textContent = text.includes("-1") ? "00:00" : text;
  };

  return (
    <div className="footer_options">
      <Btn src_img="./assets/volume.svg" alt_img="Volume" fc={muted}></Btn>
      <div className="container-progress-bar">
        <span>{currentTime}</span>
        <div
          className="container"
          ref={refContainer}
          onMouseDown={leftClickEvent}
          onMouseMove={eventOnMinute}
        >
          <div className="onMinute" ref={refOnMinute}>
            {(currentTime + "").includes("-1") ? "00:00" : currentTime}
          </div>
          <div className="progress" ref={refProgress}>
            <div
              className="pointer"
              ref={refPointer}
              onMouseDown={leftClickEvent}
            >
              {/* <div className="onMinute" ref={refOnMinute}>
                {currentTime}
              </div> */}
            </div>
          </div>
        </div>
        <span>{totalTime}</span>
      </div>
      <Btn
        src_img="./assets/fullscreen.svg"
        alt_img="Volume"
        fc={fullScreen}
      ></Btn>
      <Btn src_img="./assets/settings.svg" alt_img="Settings"></Btn>
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
