import React, { useState, useEffect } from "react";

const DateTime = () => {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    // Update every second to keep the clock accurate
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const dateOptions = { weekday: "short", month: "short", day: "numeric" };
  const timeOptions = { hour: "numeric", minute: "2-digit", hour12: true };

  const datePart = time.toLocaleDateString("en-US", dateOptions);
  const timePart = time.toLocaleTimeString("en-US", timeOptions);

  return (
    <div className="datetime-display" title={time.toLocaleString()}>
      <span className="date-part">{datePart}</span>
      <span className="time-part">{timePart}</span>
    </div>
  );
};

export default DateTime;
