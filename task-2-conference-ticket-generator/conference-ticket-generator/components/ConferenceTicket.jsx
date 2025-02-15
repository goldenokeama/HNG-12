import backgroundImage from "../assets/bg.png";
import barCodeImage from "../assets/barCode.png";
export default function ConferenceTicket({ formData, bookAnotherTicket }) {
  const bgstyles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const avatarStyles = {
    backgroundImage: `url(${formData.avatarUrl})`,
    backgroundColor: "lightgray",
    backgroundPosition: "50%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const barCodeStyles = {
    backgroundImage: `url(${barCodeImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  return (
    <>
      <div className="ticket-booked">
        <h2>Your Ticket is Booked!</h2>
        <p>You can download or Check your email for a copy</p>
      </div>

      <div className="confere-ticket" style={bgstyles}>
        <div className="inner-div">
          <div className="top-div">
            <h2>Techember Fest ”25</h2>
            <span>
              <p className="location">📍 04 Rumens road, Ikoyi, Lagos</p>
              <p className="date">📅 March 15, 2025 | 7:00 PM</p>
            </span>
          </div>

          <div className="cloudinary-image" style={avatarStyles}></div>

          <div className="ticket-details">
            <div className="top-grid">
              <div className="first-layer">
                <span className="top-left-box">
                  <h5>Enter your name</h5>
                  <p>{formData.name}</p>
                </span>
                <span className="top-right-box">
                  <h5>Enter your email *</h5>
                  <p>{formData.email}</p>
                </span>
              </div>
              <div className="second-layer">
                <span className="bottom-left-box">
                  <h5>Ticket Type:</h5>
                  <p>{formData.ticketType}</p>
                </span>
                <span className="bottom-right-box">
                  <h5>Ticket for :</h5>
                  <p>{formData.ticketCount}</p>
                </span>
              </div>
            </div>

            <div className="below">
              <h5>Special request?</h5>
              <p>
                Nil ? Or the users sad story they write in there gets this whole
                space, Max of three rows
              </p>
            </div>
          </div>
        </div>

        <div className="bar-code" style={barCodeStyles}></div>
      </div>

      <section className="next-cancel-container">
        <button className="next-button">Download Ticket</button>
        <button className="cancel-button" onClick={bookAnotherTicket}>
          Book Another Ticket
        </button>
      </section>
    </>
  );
}
