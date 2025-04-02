
import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { calculateTimeRemaining } from '@/services/auctionService';

interface CountdownTimerProps {
  endDate: Date;
  onEnd?: () => void;
  className?: string;
}

const CountdownTimer = ({ endDate, onEnd, className = '' }: CountdownTimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(endDate));

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeRemaining = calculateTimeRemaining(endDate);
      setTimeRemaining(newTimeRemaining);
      
      if (newTimeRemaining.isEnded && onEnd) {
        onEnd();
        clearInterval(timer);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [endDate, onEnd]);

  const formatTime = (value: number) => {
    return value.toString().padStart(2, '0');
  };

  if (timeRemaining.isEnded) {
    return (
      <div className={`flex items-center text-auction-danger font-medium ${className}`}>
        <Clock className="w-4 h-4 mr-1" />
        Auction Ended
      </div>
    );
  }

  // Show different formats based on time remaining
  if (timeRemaining.days > 0) {
    return (
      <div className={`flex items-center ${className}`}>
        <Clock className="w-4 h-4 mr-1" />
        <span>
          {timeRemaining.days}d {formatTime(timeRemaining.hours)}h {formatTime(timeRemaining.minutes)}m
        </span>
      </div>
    );
  }

  if (timeRemaining.hours > 0) {
    return (
      <div className={`flex items-center ${className}`}>
        <Clock className="w-4 h-4 mr-1" />
        <span>
          {formatTime(timeRemaining.hours)}h {formatTime(timeRemaining.minutes)}m {formatTime(timeRemaining.seconds)}s
        </span>
      </div>
    );
  }

  // Less than 1 hour remaining - show in red
  return (
    <div className={`flex items-center text-auction-danger animate-pulse-light font-medium ${className}`}>
      <Clock className="w-4 h-4 mr-1" />
      <span>
        {formatTime(timeRemaining.minutes)}m {formatTime(timeRemaining.seconds)}s
      </span>
    </div>
  );
};

export default CountdownTimer;
