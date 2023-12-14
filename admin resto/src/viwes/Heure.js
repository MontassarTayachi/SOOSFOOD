// Clock.js
import React, { useEffect, useState } from 'react';
import '../styles/Heure.css'; // Import your CSS file

const Clock = () => {
  const [rotation, setRotation] = useState({
    hour: 0,
    minute: 0,
    second: 0,
  });

  useEffect(() => {
    const setClock = setInterval(() => {
      const dateNow = new Date();
      const hr = dateNow.getHours();
      const min = dateNow.getMinutes();
      const sec = dateNow.getSeconds();

      const calc_hr = hr * 30 + min / 2;
      const calc_min = min * 6 + sec / 10;
      const calc_sec = sec * 6;

      setRotation({
        hour: calc_hr,
        minute: calc_min,
        second: calc_sec,
      });
    }, 1000);

    return () => clearInterval(setClock); // Cleanup the interval on component unmount
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div className="clock">
      <div className="hour hand" style={{ transform: `rotate(${rotation.hour}deg)` }}></div>
      <div className="minute hand" style={{ transform: `rotate(${rotation.minute}deg)` }}></div>
      <div className="seconds hand" style={{ transform: `rotate(${rotation.second}deg)` }}></div>
      <img src="../assets/clock.svg" alt="Reloj Analogo" />
    </div>
  );
};

export default Clock;
