import backgroundImage from "../assets/bg.png";
export default function ConferenceTicket() {
  const styles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  return (
    <>
      <div>
        <h2>Your Ticket is Booked!</h2>
        <p>You can download or Check your email for a copy</p>
      </div>

      <div className="confere-ticket" style={styles}></div>
    </>
  );
}
