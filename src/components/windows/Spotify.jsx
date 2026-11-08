import React from "react";
import MacWindows from "./MacWindows";
import "./spotify.scss";

const Spotify = ({ windowName = "spotify", setWindowsState }) => {
  return (
    <MacWindows
      windowName={windowName}
      setWindowsState={setWindowsState}
      width="30vw"
      height="440px"
    >
      <div className="spotify-window">
        <iframe
          data-testid="embed-iframe"
          style={{ borderRadius: "0 0 12px 12px" }}
          src="https://open.spotify.com/embed/playlist/37i9dQZF1DX14CbVHtvHRB?utm_source=generator&theme=0"
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Spotify Focus Playlist"
        />
      </div>
    </MacWindows>
  );
};

export default Spotify;
