import { useState, useEffect } from "react";

export function Timer() {
  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  const [time, setTime] = useState(() => {
    // Initialize with the server-rendered time
    return formatter.format(new Date());
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatter.format(new Date()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 text-sm lg:text-base">
      <p className="text-muted-foreground font-medium">{time}</p>
      <span>•</span>
      <p>mumbai, india</p>
    </div>
  );
}

export default Timer;
