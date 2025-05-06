
import { Link } from 'react-router-dom';
import { formatCurrency } from '@/services/auctionService';
import CountdownTimer from './CountdownTimer';
import { AuctionItem } from '@/services/auctionService';
import { Eye, Tag, IndianRupee } from 'lucide-react';

interface AuctionCardProps {
  auction: AuctionItem;
}

const AuctionCard = ({ auction }: AuctionCardProps) => {
  const { id, title, images, currentPrice, endDate, category, bids } = auction;
  
  return (
    <div className="auction-card group">
      <Link to={`/auction/${id}`}>
        <div className="relative">
          <div className="aspect-square w-full overflow-hidden rounded-md">
            <img 
              src={images[0] || '/placeholder.svg'} 
              alt={title}
              className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="absolute top-2 right-2">
            <div className="bg-auction-primary/80 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs flex items-center">
              <Eye className="h-3 w-3 mr-1" />
              {Math.floor(Math.random() * 20) + 5}
            </div>
          </div>
          <div className="absolute top-2 left-2">
            <div className="bg-auction-secondary/80 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs flex items-center">
              <Tag className="h-3 w-3 mr-1" />
              {category}
            </div>
          </div>
        </div>
        
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-800 line-clamp-1">{title}</h3>
          
          <div className="mt-1 flex items-center justify-between">
            <div className="font-semibold text-auction-primary flex items-center">
              <IndianRupee className="h-3 w-3 mr-1" />
              {formatCurrency(currentPrice, false)}
            </div>
            <div className="text-sm text-gray-500">
              {bids.length} bid{bids.length !== 1 ? 's' : ''}
            </div>
          </div>
          
          <div className="mt-2">
            <CountdownTimer 
              endDate={endDate} 
              className="text-sm font-medium"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AuctionCard;
