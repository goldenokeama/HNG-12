export default function Hero(props) {
  return (
    <>
      <div className="hero" {...props}>
        <div className="hero-top">
          <h2>Techember Fest "25</h2>
          <p>
            Join us for an unforgettable experience at [Event Name]! Secure your
            spot now.
          </p>
        </div>

        <div className="hero-bottom">
          <p>📍 [Event Location]</p>
          <p>March 15, 2025 | 7:00 PM</p>
        </div>
      </div>

      <div className="progress-bar" {...props}></div>
    </>
  );
}
