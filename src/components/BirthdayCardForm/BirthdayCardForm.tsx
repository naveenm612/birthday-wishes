import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./BirthdayCardForm.css";

const birthdayMessages = [
  "Wishing you a day filled with love, laughter, and cake! 🍰",
  "May your birthday be as wonderful as you are! 🎉",
  "Cheers to you and your special day! 🥳",
  "Keep shining bright and smiling wide! ✨",
  "Another year of amazing adventures awaits! 💥",
];

const BirthdayCardForm: React.FC = () => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [isCustom, setIsCustom] = useState(false);
  const [message, setMessage] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const container = document.getElementById("snow-container");

    const createSnowflake = () => {
      const flake = document.createElement("div");
      flake.className = "snowflake";
      flake.style.left = Math.random() * 100 + "vw";
      flake.style.animationDuration = 8 + Math.random() * 5 + "s";
      flake.style.opacity = (0.5 + Math.random() * 0.5).toString();

      const size = 6 + Math.random() * 6;
      flake.style.width = size + "px";
      flake.style.height = size + "px";

      const colors = ["#fca3c2", "#ffc1d8", "#ffd4e3"];
      flake.style.background = colors[Math.floor(Math.random() * colors.length)];

      container?.appendChild(flake);

      setTimeout(() => flake.remove(), 15000);
    };

    const interval = setInterval(createSnowflake, 200);
    return () => clearInterval(interval);
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSelectMessage = (msg: string) => {
    setMessage(msg);
    setDropdownOpen(false);
  };

  const handleSubmit = () => {
    const photoUrl = photo ? URL.createObjectURL(photo) : "";
    navigate("/preview", {
      state: {
        name,
        message,
        photoUrl,
      },
    });
  };

  return (
    <div className="background">
      <div className="snow-container" id="snow-container" />
      <div className="birthday-card-container">
        <h2 className="title">✨ Create Your <span>Birthday Card</span> ✨</h2>
        <p className="subtitle">Make someone's special day magical! </p>

        <div className="form-group">
          <label>Birthday Person's Name</label>
          <input
            type="text"
            placeholder="Enter their name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Upload Photo (Optional)</label>
          <div className="photo-upload">
            <input type="file" onChange={handlePhotoUpload} id="upload-photo" />
            <label htmlFor="upload-photo">
              <span><CloudUploadIcon /></span>
              <p>Click to upload photo</p>
            </label>
            {photo && <p className="file-name">Selected file: {photo.name}</p>}
          </div>
        </div>

        <div className="form-group">
          <label>Birthday Message</label>
          <div className="toggle-buttons">
            <button className={!isCustom ? "active" : ""} onClick={() => setIsCustom(false)}>
              Choose Message
            </button>
            <button className={isCustom ? "active" : ""} onClick={() => setIsCustom(true)}>
              Write Custom
            </button>
          </div>

          {!isCustom ? (
            <div className="custom-dropdown">
              <div className="dropdown-header" onClick={() => setDropdownOpen(!dropdownOpen)}>
                {message || "Select a birthday message..."}
                <span className="arrow">{dropdownOpen ? "▲" : "▼"}</span>
              </div>
              {dropdownOpen && (
                <ul className="dropdown-list">
                  {birthdayMessages.map((msg) => (
                    <li
                      key={msg}
                      onClick={() => handleSelectMessage(msg)}
                      className={msg === message ? "selected" : ""}
                    >
                      {msg}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <textarea
              placeholder="Write your birthday message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          )}
        </div>

        <button
          className="submit-btn"
          disabled={!name || !message}
          onClick={handleSubmit}
        >
          Create Birthday Card
        </button>
      </div>
    </div>
  );
};

export default BirthdayCardForm;
