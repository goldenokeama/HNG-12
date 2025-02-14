import React from "react";

export default function Header(props) {
  const progress = (props.step / props.totalSteps) * 100;

  return (
    <div className="header">
      <div className={props.step === 2 ? "step-2" : ""}>
        {props.step === 1 && <h1 className="header-h1">Ticket Selection</h1>}
        {props.step === 2 && <h2>Attendee Details</h2>}
        <p className="header-p">Step {props.step}/3</p>
      </div>

      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}
