import React from "react";

const PadGroup = ({ pads, playSound, keyed }) => {
  return (
    <div className="padGroup">
      {pads.map((pad, index) => {
        const isActive = keyed === pad.keyCode;
        return (
          <div
            onMouseDown={() => playSound(pad.name, pad.text)}
            key={pad.text}
            id={index + 1}
            className={`drum-pad${isActive ? " pad-active" : ""}`}
          >
            {pad.text}
            <audio id={pad.text} className="clip" src={pad.src}></audio>
          </div>
        );
      })}
    </div>
  );
};

export default PadGroup;
