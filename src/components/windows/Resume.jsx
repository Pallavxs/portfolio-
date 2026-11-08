import React from "react";
import MacWindows from "./MacWindows";
import "./resume.scss";

const Resume = ({ windowName = "resume", setWindowsState }) => {
  return (
    <MacWindows
      windowName={windowName}
      setWindowsState={setWindowsState}
      width="56vw"
      height="75vh"
    >
      <div className="resume-window">
        <div className="resume-toolbar">
          <div className="resume-doc-info">
            <span className="pdf-tag">PDF</span>
            <span className="filename">Pallav_Resume.pdf</span>
          </div>

          <div className="toolbar-actions">
            <a
              href="/pallav_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn open-tab"
              title="Open PDF in new tab"
            >
              Open Tab ↗
            </a>
            <a
              href="/pallav_resume.pdf"
              download="Pallav_Resume.pdf"
              className="action-btn download"
              title="Download Resume PDF"
            >
              Download PDF ↓
            </a>
          </div>
        </div>

        <div className="pdf-embed-wrapper">
          <iframe
            src="/pallav_resume.pdf#toolbar=0"
            title="Pallav Shrivastava Resume"
            frameBorder="0"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </MacWindows>
  );
};

export default Resume;
