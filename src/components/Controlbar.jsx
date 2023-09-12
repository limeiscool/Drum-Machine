import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

const Controlbar = ({
  powerBtnColor,
  togglePow,
  activePad,
  volume,
  currVolIcon,
  volChange,
}) => {
  return (
    <div className="control-bar">
      <div className="img-box">
        <FontAwesomeIcon
          style={{ color: powerBtnColor }}
          onClick={togglePow}
          className="FApow"
          icon={faPowerOff}
        />
      </div>
      <div id="display" className="active-pad-name">
        {activePad}
      </div>
      <div className="vol-container">
        <div className="vol-img-container">
          <FontAwesomeIcon className="FAvol" icon={currVolIcon} />
          vol: {Math.round(volume * 100)}%
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={volChange}
        />
      </div>
    </div>
  );
};

export default Controlbar;
