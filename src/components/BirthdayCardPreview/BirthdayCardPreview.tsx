// import React, { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import IosShareIcon from '@mui/icons-material/IosShare';
// import RotateLeftIcon from '@mui/icons-material/RotateLeft';
// import "./BirthdayCardPreview.css";

// interface LocationState {
//     name: string;
//     message: string;
//     photoUrl?: string;
// }

// const BirthdayCardPreview: React.FC = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { name, message, photoUrl } = location.state as LocationState;

//     // Snowflake generator
//     useEffect(() => {
//         const container = document.getElementById("snow-container");

//         const createSnowflake = () => {
//             const flake = document.createElement("div");
//             flake.className = "snowflake";
//             flake.style.left = Math.random() * 100 + "vw";
//             flake.style.animationDuration = 8 + Math.random() * 5 + "s";
//             flake.style.opacity = (0.5 + Math.random() * 0.5).toString();

//             const size = 6 + Math.random() * 6;
//             flake.style.width = size + "px";
//             flake.style.height = size + "px";

//             const colors = ["#fca3c2", "#ffc1d8", "#ffd4e3"];
//             flake.style.background = colors[Math.floor(Math.random() * colors.length)];

//             container?.appendChild(flake);

//             setTimeout(() => flake.remove(), 15000);
//         };

//         const interval = setInterval(createSnowflake, 200);
//         return () => clearInterval(interval);
//     }, []);

//     const handleShareWhatsApp = () => {
//         const text = `🎉 Happy Birthday ${name}! 🎉\n\n${message}`;
//         const encoded = encodeURIComponent(text);
//         window.open(`https://wa.me/?text=${encoded}`, "_blank");
//     };

//     return (
//         <div className="preview-background">
//             <div className="snow-container" id="snow-container" />
//             <div className="preview-container animate-card">
//                 <h2 className="greeting animate-fade">🎉 Happy Birthday! 🎉</h2>
//                 <div className="heart-line">
//                     <span className="heart left">♡</span>
//                     <span className="gradient-bar"></span>
//                     <span className="heart right">♡</span>
//                 </div>
//                 <div className="photo-circle glow-border">
//                     {photoUrl ? (
//                         <img src={photoUrl} alt="Profile" />
//                     ) : (
//                         <div className="placeholder-photo" />
//                     )}
//                 </div>
//                 <h3 className="name-text animate-fade">{name}</h3>
//                 <div className="heart-line">
//                     <span className="gradient-bar"></span>
//                 </div>
//                 <p className="message-box animate-fade">{message}</p>
//                 <div className="emojis">
//                     <span>🎂</span>
//                     <span>🍭</span>
//                     <span>🎁</span>
//                     <span>🎊</span>
//                 </div>

//                 <div className="button-group animate-fade">
//                     <button className="secondary-btn" onClick={() => navigate("/")}>
//                         <RotateLeftIcon className="rotate-icon" /> Create Another Card
//                     </button>
//                     <button className="primary-btn" onClick={handleShareWhatsApp}>
//                         <IosShareIcon className="share-icon" /> Share on WhatsApp
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default BirthdayCardPreview;





import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import IosShareIcon from "@mui/icons-material/IosShare";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import html2canvas from "html2canvas";
import "./BirthdayCardPreview.css";

interface LocationState {
  name: string;
  message: string;
  photoUrl?: string;
}

const BirthdayCardPreview: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, message, photoUrl } = location.state as LocationState;
  const cardRef = useRef<HTMLDivElement>(null);

  // Snowflake animation
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

  const handleShareWhatsApp = async () => {
    if (!cardRef.current) return;

    const canvas = await html2canvas(cardRef.current);
    canvas.toBlob(async (blob) => {
      if (!blob) return;

      const file = new File([blob], "birthday-card.png", { type: "image/png" });

      // Try to use the Web Share API
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: `Happy Birthday ${name}`,
            text: `Here's a birthday card for you! 🎂🎉`,
          });
        } catch (err) {
          console.error("Sharing failed:", err);
        }
      } else {
        // Fallback: Download the image and notify the user
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "birthday-card.png";
        link.click();
        alert("Card image downloaded! You can now share it manually on WhatsApp.");
      }
    });
  };

  return (
    <div className="preview-background">
      <div className="snow-container" id="snow-container" />
      <div className="preview-container animate-card" ref={cardRef}>
        <h2 className="greeting animate-fade">🎉 Happy Birthday! 🎉</h2>
        <div className="heart-line">
          <span className="heart left">♡</span>
          <span className="gradient-bar"></span>
          <span className="heart right">♡</span>
        </div>
        <div className="photo-circle glow-border">
          {photoUrl ? (
            <img src={photoUrl} alt="Profile" />
          ) : (
            <div className="placeholder-photo" />
          )}
        </div>
        <h3 className="name-text animate-fade">{name}</h3>
        <div className="heart-line">
          <span className="gradient-bar"></span>
        </div>
        <p className="message-box animate-fade">{message}</p>
        <div className="emojis">
          <span>🎂</span>
          <span>🍭</span>
          <span>🎁</span>
          <span>🎊</span>
        </div>

        <div className="button-group animate-fade">
          <button className="secondary-btn" onClick={() => navigate("/")}>
            <RotateLeftIcon className="rotate-icon" /> Create Another Card
          </button>
          <button className="primary-btn" onClick={handleShareWhatsApp}>
            <IosShareIcon className="share-icon" /> Share Card
          </button>
        </div>
      </div>
    </div>
  );
};

export default BirthdayCardPreview;
