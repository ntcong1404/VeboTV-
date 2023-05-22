import { useState, useEffect } from "react";

const getCurrentTime = () => {
  const now = new Date();
  const time =
    now.getHours() +
    ":" +
    ("0" + now.getMinutes()).slice(-2) +
    ":" +
    ("0" + now.getSeconds()).slice(-2);
  return time;
};
function Update() {
  const [time, setTime] = useState(getCurrentTime());

  useEffect(() => {
    const interval = setInterval(() => setTime(getCurrentTime()), 15000);

    return () => clearTimeout(interval);
  }, []);
  return time;
}

export default Update;
