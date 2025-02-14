import React from "react";
export default function FirstForm(props) {
  const ticketElements = [
    <label className={`ticket`} htmlFor="free" key="free">
      <input
        type="radio"
        id="free"
        name="ticketType"
        value="free"
        checked={props.formData.ticketType === "free"}
        onChange={props.handleChange}
      />
      <div className="ticket-content">
        <span className="ticket-label">Free</span>
        <span>
          <span className="ticket-subtext">Regular Access</span>
          <span className="ticket-availability">20/52</span>
        </span>
      </div>
    </label>,

    <label className={`ticket`} htmlFor="vip" key="vip">
      <input
        type="radio"
        id="vip"
        name="ticketType"
        value="vip"
        checked={props.formData.ticketType === "vip"}
        onChange={props.handleChange}
      />
      <div className="ticket-content">
        <span className="ticket-label">VIP</span>
        <span>
          <span className="ticket-subtext">VIP Access</span>
          <span className="ticket-availability">20/52</span>
        </span>
      </div>
    </label>,

    <label className={`ticket`} htmlFor="vvip" id="vvip">
      <input
        type="radio"
        id="vvip"
        name="ticketType"
        value="vvip"
        checked={props.formData.ticketType === "vvip"}
        onChange={props.handleChange}
      />
      <div className="ticket-content">
        <span className="ticket-label">$150</span>
        <span>
          <span className="ticket-subtext">VVIP Access</span>
          <span className="ticket-availability">20/52</span>
        </span>
      </div>
    </label>,
  ];

  return (
    <>
      <section className="ticket-container">
        <h2>Select Ticket Type:</h2>

        <div className="ticket-options">{ticketElements}</div>
      </section>

      <section className="input-container">
        <label htmlFor="ticket-count">Number of Tickets</label>
        <div className="input-wrapper">
          <input
            type="text"
            id="ticket-count"
            name="ticketCount"
            value={props.formData.ticketCount}
            onChange={props.handleChange}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="icon"
          >
            <path
              d="M16.293 8.29309L12 12.5861L7.70697 8.29309L6.29297 9.70709L12 15.4141L17.707 9.70709L16.293 8.29309Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      <section className="next-cancel-container">
        <button className="next-button" onClick={() => props.nextStep()}>
          Next
        </button>
        <button className="cancel-button">Cancel</button>
      </section>
    </>
  );
}
