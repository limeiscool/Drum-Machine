import { useEffect, useState } from "react";
import "./App.css";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { faVolumeLow } from "@fortawesome/free-solid-svg-icons";
import { faVolumeOff } from "@fortawesome/free-solid-svg-icons";
import bank1 from "./assets/bank1.json";
import Controlbar from "./components/Controlbar";
import PadGroup from "./components/PadGroup";

function App() {
  const [activePad, setActivePad] = useState("");
  const [volume, setVolume] = useState(0.75);
  const [currVolIcon, setVolIcon] = useState(faVolumeHigh);
  const [powerOn, setPower] = useState(true);
  const [keyed, setKeyed] = useState(null);
  const pads = bank1;

  const volChange = (event) => {
    const newVol = parseFloat(event.target.value);
    let iconVol = Math.round(newVol * 100);
    iconVol >= 50
      ? setVolIcon(faVolumeHigh)
      : iconVol > 0
      ? setVolIcon(faVolumeLow)
      : setVolIcon(faVolumeOff);
    setVolume(newVol);
  };

  const playSound = (name, selector) => {
    if (!powerOn) return;
    const audio = document.getElementById(selector);
    audio.currentTime = 0;
    audio.volume = volume;
    audio.play();
    setActivePad(name);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const pad = pads.find((pad) => pad.keyCode === event.keyCode);
      if (pad) {
        playSound(pad.name, event.key.toUpperCase());
        setKeyed(event.keyCode);
      }
    };

    const handleKeyUp = (event) => {
      if (keyed === event.keyCode) {
        setKeyed(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [pads, keyed]);

  const togglePow = () => {
    setPower(!powerOn);
  };

  const powerBtnColor = powerOn
    ? "rgba(0, 255, 0, 0.8)"
    : "rgba(255, 0, 0, 0.8)";

  return (
    <div id="drum-machine" className="main-container">
      <Controlbar
        powerBtnColor={powerBtnColor}
        togglePow={togglePow}
        activePad={activePad}
        volume={volume}
        currVolIcon={currVolIcon}
        volChange={volChange}
      />
      <PadGroup pads={pads} playSound={playSound} keyed={keyed} />
    </div>
  );
}

export default App;
