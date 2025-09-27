import React, { useEffect, useRef, useState } from "react";

/**
 * CountdownCircle
 * Props:
 * - time (number): initial countdown time in seconds
 * - running (boolean): whether timer should run
 * - size (number): diameter in px (default 140)
 * - strokeWidth (number): circle stroke width (default 12)
 * - onComplete (fn): called when timer reaches 0
 * - className (string): additional wrapper classes
 *
 * Behavior:
 * - Respects changes to `time` prop by resetting the timer
 * - Starts / pauses based on `running` prop
 * - Calls onComplete once when reaching 0
 * - Uses high-resolution timing (Date.now) to avoid drift
 */

export default function CountdownCircle({
  time,
  running,
  size = 50,
  strokeWidth = 5,
  onComplete,
  className = "",
  setTime
}) {
  const initialMsRef = useRef(Math.max(0, Math.floor(time * 1000)));
  const [remainingMs, setRemainingMs] = useState(initialMsRef.current);
  const runningRef = useRef(running);
  const rafRef = useRef(null);
  const lastTickRef = useRef(null);
  const completedRef = useRef(false);

  // Reset when `time` prop changes
  useEffect(() => {
    const ms = Math.max(0, Math.floor(time * 1000));
    initialMsRef.current = ms;
    setRemainingMs(ms);
    completedRef.current = false;
  }, [time]);

  // Keep runningRef in sync
  useEffect(() => {
    runningRef.current = running;
    if (running) startLoop();
    else stopLoop();
    return () => stopLoop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  // start the RAF loop
  function startLoop() {
    if (rafRef.current) return; // already running
    lastTickRef.current = Date.now();

    function tick() {
      const now = Date.now();
      const delta = now - lastTickRef.current;
      lastTickRef.current = now;
      setRemainingMs(prev => {
        const next = Math.max(0, prev - delta);
        if (next === 0 && !completedRef.current) {
          completedRef.current = true;
          if (typeof onComplete === "function") onComplete();
        }
        return next;
      });

      if (runningRef.current) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    }

    rafRef.current = requestAnimationFrame(tick);
  }

  function stopLoop() {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }

  // Clean up on unmount
  useEffect(() => {
    return () => stopLoop();
  }, []);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = initialMsRef.current === 0 ? 1 : 1 - remainingMs / initialMsRef.current;
  const dashoffset = circumference * (1 - progress);

  const minutes = Math.floor(remainingMs / 60000);
  const seconds = Math.floor((remainingMs % 60000) / 1000);
  const padded = `${minutes}:${String(seconds).padStart(2, "0")}`;

  // Dynamic color based on progress percentage
  let strokeColor = "#06b6d4"; // default (cyan)
  if (progress >= 0.75) strokeColor = "#dc2626"; // red (danger)
  else if (progress >= 0.5) strokeColor = "#f59e0b"; // amber (warning)
  else if (progress >= 0.25) strokeColor = "#84cc16"; // green (mid)

  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <svg
        width={size}
        height={size}
        role="img"
        aria-label={`Countdown: ${padded}`}
      >
        {/* background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="rgba(211, 211, 211, 0.08)"
          fill="none"
        />

        {/* progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={strokeColor}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dashoffset 120ms linear, stroke 300ms linear" }}
        />

        {/* center content (time) */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize={Math.max(14, size * 0.16)}
          fontFamily="Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto"
          fill="#f3f3f3ff"
        >
          {padded}
        </text>
      </svg>

      {/* hidden live region for screen readers */}
  
    </div>
  );
}


/*
  USAGE EXAMPLE:

  import CountdownCircle from './CountdownCircle'
  function Demo(){
    const [running, setRunning] = useState(true)
    return (
      <div>
        <CountdownCircle time={90} running={running} onComplete={()=>console.log('done')} />
        <button onClick={()=>setRunning(r=>!r)}>{running? 'Pause' : 'Start'}</button>
      </div>
    )
  }

*/