import backgroundImage from "../assets/bg.png";
export default function ConferenceTicket({ formData }) {
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
  return (
    <>
      <div>
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
        </div>
      </div>
    </>
  );
}
