import React from "react";
export default function FirstForm(props) {
  const [errors, setErrors] = React.useState({});

  const { ticketType } = props.formData;

  const ticketElements = [
    <label
      className={`ticket ${ticketType === "free" ? "selected" : ""}`}
      htmlFor="free"
      key="free"
    >
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

    <label
      className={`ticket ${ticketType === "vip" ? "selected" : ""}`}
      htmlFor="vip"
      key="vip"
    >
      <input
        type="radio"
        id="vip"
        name="ticketType"
        value="vip"
        checked={props.formData.ticketType === "vip"}
        onChange={props.handleChange}
      />
      <div className="ticket-content">
        <span className="ticket-label">$150</span>
        <span>
          <span className="ticket-subtext">VIP Access</span>
          <span className="ticket-availability">20/52</span>
        </span>
      </div>
    </label>,

    <label
      className={`ticket ${ticketType === "vvip" ? "selected" : ""}`}
      htmlFor="vvip"
      key="vvip"
    >
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

  // console.log(import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

  const validateAndNext = () => {
    let newErrors = {};

    if (!props.formData.ticketType) {
      newErrors.ticketType = "Please select a type of ticket";
    }
    if (!props.formData.ticketCount || isNaN(props.formData.ticketCount)) {
      newErrors.ticketCount = "Please enter a valid number of tickets.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      props.nextStep();
    }
  };

  return (
    <>
      <section className="ticket-container">
        <h2>Select Ticket Type:</h2>

        <div className="ticket-options">{ticketElements}</div>

        {errors.ticketType && (
          <p style={{ color: "red" }} role="alert" aria-live="assertive">
            {errors.ticketType}
          </p>
        )}
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

        {errors.ticketCount && (
          <p style={{ color: "red" }} role="alert" aria-live="assertive">
            {errors.ticketCount}
          </p>
        )}
      </section>

      <section className="next-cancel-container">
        <button className="next-button" onClick={validateAndNext}>
          Next
        </button>
        <button className="cancel-button">Cancel</button>
      </section>
    </>
  );
}
