import React, { useState, useEffect, useRef } from 'react';
import clock_tick from './30_sec.mp3';
import clock_end from './timer-tick-end.mp3';
const CountdownTimer: React.FC<{
  onTimeEnd: () => void
}> = ({onTimeEnd}) => {
  const [seconds, setSeconds] = useState(30);
  const tickSoundRef = useRef<HTMLAudioElement>(null)
  const tickEndSoundRef = useRef<HTMLAudioElement>(null)

  const [isRunning, setIsRunning] = useState(true); // Start automatically
  const playTickSound = () => {
    if (tickSoundRef.current) {
      tickSoundRef.current.volume = 0.4
      tickSoundRef.current.currentTime = 0; // Reset sound playback
      tickSoundRef.current.play();
    }
  };
  useEffect(() => {
    let timer: number;
    if (isRunning && seconds > 0) {
      console.log(seconds)
     if (seconds === 30) {
        playTickSound();
     }
      timer = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsRunning(false);
      if (tickEndSoundRef.current) {
        tickEndSoundRef.current.volume = 0.4
        tickEndSoundRef.current.currentTime = 0; // Reset sound playback
        tickEndSoundRef.current.play();
      }
      onTimeEnd();
    }

    return () => clearInterval(timer);
  }, [isRunning, seconds]);

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="p-6">
        <div className="text-center">
          <div className="text-6xl font-bold mb-6 text-white-500">
            {seconds}
          </div>
        </div>
      </div>
      <audio className="w-0 h-0" ref={tickSoundRef} src={clock_tick} preload="auto"></audio>
      <audio className="w-0 h-0" ref={tickEndSoundRef} src={clock_end} preload="auto"></audio>
    </div>
  );
};

export default CountdownTimer;