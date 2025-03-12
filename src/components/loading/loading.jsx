import React, { useState, useEffect } from "react";
import "./loading.css";

const Loading = () => {
  const flavorTexts = [
    "Filling Popcorn Buckets...",
    "Getting a Dr. Pepper Refill...",
    "Browsing Netflix...",
    "Loading Film Reels...",
    "Rewinding VHS Tapes...",
    "Checking Rotten Tomatoes...",
    "Adjusting Aspect Ratio...",
    "Cleaning the Projector Lens...",
    "Avoiding Spoilers...",
    "Waiting for the Post-Credit Scene...",
    "Fast-Forwarding Through Ads...",
  ];

  const [flavorText, setFlavorText] = useState("");
  useEffect(() => {
    // Pick a random flavor text when component mounts
    setFlavorText(flavorTexts[Math.floor(Math.random() * flavorTexts.length)]);
  }, []);

  return (
    <main>
      <div className="loading-container">
        <h3>Please Wait While We Load...</h3>
        <div className="spinner"></div>
        {/* Spinning Loading thing here... */}
        <p>{flavorText}</p>
      </div>
    </main>
  );
};

export default Loading;
