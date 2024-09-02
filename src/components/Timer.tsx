import { useState, useEffect } from "react";

export function Timer() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="flex items-center gap-2 text-sm lg:text-base">
      <p className="text-muted-foreground font-medium">
        {time.toLocaleTimeString()}
      </p>
      <span>•</span>
      <p>mumbai, india</p>
    </div>
  );
}

export default Timer;
