import React, { useState } from "react";
import "../styles/Support.css";

function Support() {
  const [message, setMessage] = useState("");

  const sendEmail = () => {
    window.location.href = `mailto:yunuskr40@gmail.com?body=${encodeURIComponent(
      message
    )}`;
  };

  return (
    <div>
      <h1>Support</h1>
      <p>Bei Fragen können Sie uns eine E-Mail senden:</p>
      <div className="support-container">
        <p>Nachricht schreiben und auf "Senden" klicken</p>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: "300px", height: "200px" }}
        />
        <button onClick={sendEmail}>Senden</button>
      </div>
    </div>
  );
}

export default Support;
