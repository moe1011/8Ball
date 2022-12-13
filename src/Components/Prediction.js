import React, { useEffect, useState } from "react";

export default function Prediction(props) {
  const predictions = [
    "It is certain",
    "It is decidedly so",
    "Without a doubt",
    "Yes definitely",
    "You may rely on it",
    "As I see it, yes",
    "Most likely",
    "Outlook good",
    "Yes",
    "Signs point to yes",
    "Reply hazy, try again",
    "Ask again later",
    "Cannot predict now",
    "Concentrate and ask again",
    "Don't count on it",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Very doubtful",
  ];

  const [ballPrediction, setBallPrediction] = useState("");

  useEffect(()=>{
    Predict();

  }, [props.predict]);

  function Predict() {
    if(props.predict == true){
      const prediction = predictions.at([Math.random() * predictions.length]);
      // [Math.random() * predictions.length]
      setBallPrediction(prediction.toUpperCase());
    }
  }

  return <div className="">
    {ballPrediction}
  </div>;
}
