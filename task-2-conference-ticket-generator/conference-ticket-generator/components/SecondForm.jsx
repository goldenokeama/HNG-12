import React, { useState } from "react";
import AvatarDropzone from "./AvatarDropzone";

export default function secondForm(props) {
  const [avatar, setAvatar] = useState(null);

  let imagePath = "";

  if (avatar) {
    imagePath = URL.createObjectURL(avatar);
    // send to cloudinary
  }

  return (
    <>
      <div className="profilePhoto">
        <h2>Upload Profile Photo</h2>

        {avatar === null && (
          <div className="avatar-dropzone">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="33"
              height="32"
              viewBox="0 0 33 32"
              fill="none"
            >
              <path
                d="M25.764 14.816C25.1813 10.2266 21.2507 6.66663 16.5053 6.66663C12.8307 6.66663 9.63866 8.81463 8.18133 12.2C5.31733 13.056 3.172 15.76 3.172 18.6666C3.172 22.3426 6.16266 25.3333 9.83866 25.3333H11.172V22.6666H9.83866C7.63333 22.6666 5.83866 20.872 5.83866 18.6666C5.83866 16.7946 7.43733 14.9906 9.40266 14.6453L10.1773 14.5093L10.4333 13.7653C11.3707 11.0306 13.6973 9.33329 16.5053 9.33329C20.1813 9.33329 23.172 12.324 23.172 16V17.3333H24.5053C25.976 17.3333 27.172 18.5293 27.172 20C27.172 21.4706 25.976 22.6666 24.5053 22.6666H21.8387V25.3333H24.5053C27.4467 25.3333 29.8387 22.9413 29.8387 20C29.8371 18.8047 29.4348 17.6444 28.6962 16.7046C27.9575 15.7649 26.9251 15.0999 25.764 14.816Z"
                fill="#FAFAFA"
              />
              <path
                d="M17.8387 18.6666V13.3333H15.172V18.6666H11.172L16.5053 25.3333L21.8387 18.6666H17.8387Z"
                fill="#FAFAFA"
              />
            </svg>
            <AvatarDropzone onFileUpload={setAvatar} />
          </div>
        )}

        {avatar && (
          <div
            className="avatar-dropzone-image"
            style={{
              background: `url(${imagePath}) lightgray 0px 0px / 100% 150% no-repeat`,
            }}
          >
            <div className="overlay">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="33"
                height="32"
                viewBox="0 0 33 32"
                fill="none"
              >
                <path
                  d="M25.764 14.816C25.1813 10.2266 21.2507 6.66663 16.5053 6.66663C12.8307 6.66663 9.63866 8.81463 8.18133 12.2C5.31733 13.056 3.172 15.76 3.172 18.6666C3.172 22.3426 6.16266 25.3333 9.83866 25.3333H11.172V22.6666H9.83866C7.63333 22.6666 5.83866 20.872 5.83866 18.6666C5.83866 16.7946 7.43733 14.9906 9.40266 14.6453L10.1773 14.5093L10.4333 13.7653C11.3707 11.0306 13.6973 9.33329 16.5053 9.33329C20.1813 9.33329 23.172 12.324 23.172 16V17.3333H24.5053C25.976 17.3333 27.172 18.5293 27.172 20C27.172 21.4706 25.976 22.6666 24.5053 22.6666H21.8387V25.3333H24.5053C27.4467 25.3333 29.8387 22.9413 29.8387 20C29.8371 18.8047 29.4348 17.6444 28.6962 16.7046C27.9575 15.7649 26.9251 15.0999 25.764 14.816Z"
                  fill="#FAFAFA"
                />
                <path
                  d="M17.8387 18.6666V13.3333H15.172V18.6666H11.172L16.5053 25.3333L21.8387 18.6666H17.8387Z"
                  fill="#FAFAFA"
                />
              </svg>
              <AvatarDropzone onFileUpload={setAvatar} />
            </div>
          </div>
        )}
      </div>

      <div className="progress-bar"></div>

      <div className="name-input">
        <label htmlFor="number-of-tickets">Number of Tickets</label>
        <input
          type="text"
          id="number-of-tickets"
          name="name"
          placeholder="Enter your name"
          value={props.formData.name}
          onChange={props.handleChange}
          required
        />
      </div>

      <div className="email-input">
        <label htmlFor="email">Enter your Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={props.formData.email}
          onChange={props.handleChange}
          required
        />
      </div>

      <div className="message-input">
        <label htmlFor="message">About the project</label>
        <textarea
          name="projectDetail"
          id="message"
          placeholder="Textarea"
          value={props.formData.projectDetail}
          onChange={props.handleChange}
          required
        />
      </div>

      <section className="next-cancel-container">
        <button className="next-button">Get My Free Ticket</button>
        <button className="cancel-button" onClick={() => props.prevStep()}>
          Back
        </button>
      </section>
    </>
  );
}
