
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface CountdownTimerProps {
  endDate: string;
  className?: string;
  onEnd?: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  endDate, 
  className,
  onEnd 
}) => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endDate).getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setIsEnded(true);
        if (onEnd) onEnd();
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };
    };

    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate, onEnd]);

  const formatNumber = (num: number) => {
    return num < 10 ? `0${num}` : num;
  };

  if (isEnded) {
    return <div className={cn("text-red-500 font-medium", className)}>Auction ended</div>;
  }

  return (
    <div className={cn("", className)}>
      {timeLeft.days > 0 && (
        <span className="font-medium">
          {timeLeft.days}d {formatNumber(timeLeft.hours)}h {formatNumber(timeLeft.minutes)}m left
        </span>
      )}
      {timeLeft.days === 0 && timeLeft.hours > 0 && (
        <span className="font-medium">
          {formatNumber(timeLeft.hours)}h {formatNumber(timeLeft.minutes)}m {formatNumber(timeLeft.seconds)}s left
        </span>
      )}
      {timeLeft.days === 0 && timeLeft.hours === 0 && (
        <span className="text-red-500 font-medium">
          {formatNumber(timeLeft.minutes)}m {formatNumber(timeLeft.seconds)}s left
        </span>
      )}
    </div>
  );
};

export default CountdownTimer;
