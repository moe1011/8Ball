import "./App.css";
import React, { useState, useEffect } from "react";


import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import Prediction from "./Components/Prediction";
import Nav from "./Components/Nav";

/*
? Idea is: Magic 8 ball has some states
? Static: Floats/Hovers around the screen slowly
? On Single tap: Do some sort of animation
? Charging up(long press): When long pressed effects produce around the 8 Ball
? Charge Release: After long press is let go, do an animation and display the 8 Balls prediction
*/
function App() {
  //States
  const [isBallTouch, setIsBallTouch] = useState(false); // Used to detect if the ball is being touched
  const [mouseDown, setMouseDown] = useState(0); // Used to check if the mouse or touch is a single click or a hold
  const [predict, setPredict] = useState(false); // Should the 8 Ball create a prediction
  const [isHold, setIsHold] = useState(false); // Is the 8 Ball being held down
  const [isHoldAnimationPlaying, setIsHoldAnimationPlaying] = useState(false); // Is the Hold Down animation playing

  const STATE_MACHINE_NAME = "8Ball SM";
  const { rive, RiveComponent } = useRive({
    src: "riv1.riv",
    artboard: "8Ball",
    stateMachines: STATE_MACHINE_NAME,
    autoplay: true,

    onStateChange: (event) => {
      // Used to check the current state machine animation being ran
      // console.log(event.data[0]);
      if (event.data[0] == "Charge" || event.data[0] == "Charge-Full") {
        console.log("data matched");
        setIsHoldAnimationPlaying(true);
      }

      if (event.data[0] == "Charge-Release") {
        setTimeout(() => {
          setPredict(true);
        }, 2000);
      }
    },
  });

  const onTappedInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    "Tapped"
  );
  const onHoldInput = useStateMachineInput(rive, STATE_MACHINE_NAME, "Hold");
  const onLetGoInput = useStateMachineInput(rive, STATE_MACHINE_NAME, "Let Go");

  //Effects
  useEffect(() => {
    const timer = setTimeout(() => {
      // If mouseDown value is greater than 0 then it is a long press
      if (mouseDown > 0) {
        // console.log("Hold");
        onHoldInput.fire();
        setIsHold(true);
        // Otherwise a short press (Tap/Click) is made
      } else {
        setIsHold(false);
      }
      // Time in ms for it to be considered a long press
    }, 250);
    return () => clearTimeout(timer);
    //If the value of mouseDown changes then this effect will be called
  }, [mouseDown]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (predict == true) {
        setPredict(false);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [predict]);

  //Functions
  function handleMouseUp() {
    // setMouseDown((prev) => --prev);
    // If Long Press
    if (isHold && isHoldAnimationPlaying) {
      // console.log("Long Press Mouse Up");
      setIsHoldAnimationPlaying(false);
      onLetGoInput.fire();

      // If Short Press
    } else if (isBallTouch) {
      // console.log("Short Press Mouse Up");
      onTappedInput.fire();
      setIsBallTouch(false);
    }
  }
  function handleMouseDown() {
    //Setting States
    setMouseDown((prev) => ++prev);
    setIsBallTouch(true);
  }

  //Return (Main display)
  return (
    <div
      className="App select-none h-screen w-screen"
      onMouseUp={handleMouseUp}
      onTouchEnd={handleMouseUp}
    >
      <div className="relative text-[21px] md:text-4xl lg:text-[55px] font-bold top-40 sm:top-36 ">
        <div
          className="Left-Intro bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 text-transparent h-24
        left-1 md:left-16 lg:left-20 absolute sm:w-max "
        >
          HOLD THE 8 BALL
        </div>
        <div
          className="Right-Intro bg-clip-text bg-gradient-to-r from-blue-500 to-sky-400 text-transparent h-24
        right-1 md:right-16 lg:right-20 absolute sm:w-max"
        >
          ASK YOUR QUESTION
        </div>
      </div>
      <header className="App-header h-screen w-screen">
        <div
          className={
            (predict == false ? "animate-fade-out" : "animate-fade-in") +
            " absolute text-center top-44 sm:top-36 md:top-[6.5rem] text-3xl md:text-4xl bg-clip-text bg-gradient-to-b from-sky-500 to-blue-700 text-transparent h-24 w-screen"
          }
        >
          <Prediction predict={predict} />
        </div>

        <RiveComponent
          className="h-[30rem] w-[30rem] md:h-[40rem] md:w-[40rem] cursor-pointer z-10"
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        />
        <Nav/>
      </header>
    </div>
  );
}

export default App;
