import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import CountdownTimer from '@/components/CountdownTimer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { formatCurrency, getAuctionById, placeBid, type AuctionItem, type Bid } from '@/services/auctionService';
import { Clock, Info, AlertTriangle, DollarSign, ArrowRight, Eye, ShoppingBag, CalendarDays, User, Tag } from 'lucide-react';

const AuctionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [auction, setAuction] = useState<AuctionItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState('');
  const [showBidDialog, setShowBidDialog] = useState(false);
  const [placingBid, setPlacingBid] = useState(false);
  const [bidError, setBidError] = useState('');
  
  useEffect(() => {
    const fetchAuction = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const data = await getAuctionById(id);
        if (data) {
          setAuction(data);
          // Set initial bid amount to current price + minimum increment
          const minIncrement = data.currentPrice >= 1000 ? 100 : (data.currentPrice >= 100 ? 10 : 5);
          setBidAmount((data.currentPrice + minIncrement).toString());
        } else {
          navigate('/auctions');
          toast({
            title: "Auction not found",
            description: "The auction you're looking for doesn't exist or has been removed.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error('Error fetching auction:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAuction();
  }, [id, navigate]);
  
  const handleBidDialogOpen = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login or register to place a bid.",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    
    if (!auction) return;
    
    const minIncrement = auction.currentPrice >= 1000 ? 100 : (auction.currentPrice >= 100 ? 10 : 5);
    setBidAmount((auction.currentPrice + minIncrement).toString());
    setBidError('');
    setShowBidDialog(true);
  };
  
  const handleBidSubmit = async () => {
    if (!auction || !user) return;
    
    setPlacingBid(true);
    setBidError('');
    
    const bidAmountNum = parseFloat(bidAmount);
    
    if (isNaN(bidAmountNum) || bidAmountNum <= 0) {
      setBidError('Please enter a valid bid amount');
      setPlacingBid(false);
      return;
    }
    
    if (bidAmountNum <= auction.currentPrice) {
      setBidError(`Your bid must be higher than the current bid (${formatCurrency(auction.currentPrice)})`);
      setPlacingBid(false);
      return;
    }
    
    try {
      // Fix the placeBid call - pass only 3 arguments as expected
      const updatedAuction = await placeBid(auction.id, user.id, bidAmountNum);
      
      // Update auction with new bid
      setAuction(updatedAuction);
      
      toast({
        title: "Bid placed successfully!",
        description: `You are now the highest bidder at ${formatCurrency(bidAmountNum)}.`,
      });
      
      setShowBidDialog(false);
    } catch (error) {
      let errorMessage = 'An error occurred while placing your bid';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setBidError(errorMessage);
    } finally {
      setPlacingBid(false);
    }
  };
  
  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-square bg-gray-300 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                <div className="h-12 bg-gray-300 rounded w-full mt-8"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!auction) {
    return (
      <Layout>
        <div className="container mx-auto py-16 px-4 text-center">
          <AlertTriangle className="h-12 w-12 mx-auto text-auction-danger mb-4" />
          <h1 className="text-2xl font-bold mb-4">Auction Not Found</h1>
          <p className="text-gray-600 mb-6">
            The auction you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/auctions')}>
            Browse Other Auctions
          </Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/auctions">Auctions</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/auctions?category=${auction.category}`}>
                {auction.category}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>{auction.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <div>
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 mb-4">
              <img 
                src={auction.images[0] || '/placeholder.svg'} 
                alt={auction.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
            
            {/* Additional images would go here */}
          </div>
          
          {/* Auction Info */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-auction-primary mb-2">
              {auction.title}
            </h1>
            
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Tag className="h-4 w-4 mr-1" />
              <span className="mr-4">{auction.category}</span>
              <Eye className="h-4 w-4 mr-1" />
              <span>{Math.floor(Math.random() * 50) + 10} watching</span>
            </div>
            
            <div className="flex items-center mb-6">
              <div className="flex-1">
                <div className="text-sm text-gray-500">Current Bid</div>
                <div className="text-2xl font-bold text-auction-primary">
                  {formatCurrency(auction.currentPrice)}
                </div>
                <div className="text-sm text-gray-500">
                  {auction.bids.length} bid{auction.bids.length !== 1 ? 's' : ''}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="text-sm text-gray-500">Time Remaining</div>
                <CountdownTimer 
                  endDate={new Date(auction.endDate)} 
                  className="text-lg font-semibold"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <Button 
                className="w-full py-6 text-lg bg-auction-secondary hover:bg-auction-highlight"
                onClick={handleBidDialogOpen}
              >
                <DollarSign className="h-5 w-5 mr-2" />
                Place Bid
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Auction Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-gray-500 mr-2">Seller:</span>
                  <span>{auction.sellerName}</span>
                </div>
                <div className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-gray-500 mr-2">Started:</span>
                  <span>{formatDate(auction.startDate)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-gray-500 mr-2">Ends:</span>
                  <span>{formatDate(auction.endDate)}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-gray-500 mr-2">Starting Price:</span>
                  <span>{formatCurrency(auction.startingPrice)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Item Description */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Item Description</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-700 whitespace-pre-line">
              {auction.description}
            </p>
          </div>
        </div>
        
        {/* Bid History */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Bid History</h2>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {auction.bids.length} Bid{auction.bids.length !== 1 ? 's' : ''}
              </CardTitle>
              <CardDescription>
                Showing all bids for this auction
              </CardDescription>
            </CardHeader>
            <CardContent>
              {auction.bids.length > 0 ? (
                <div className="space-y-4">
                  {auction.bids.map((bid) => (
                    <div key={bid.id} className="flex items-center justify-between pb-3 border-b">
                      <div>
                        <div className="font-medium">{bid.userName}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(bid.timestamp).toLocaleString()}
                        </div>
                      </div>
                      <div className="font-semibold text-auction-primary">
                        {formatCurrency(bid.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <ShoppingBag className="h-10 w-10 mx-auto mb-2 opacity-50" />
                  <p>No bids yet. Be the first to bid!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Bid Dialog */}
      <Dialog open={showBidDialog} onOpenChange={setShowBidDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Place a Bid</DialogTitle>
            <DialogDescription>
              You are bidding on "{auction.title}"
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex justify-between items-center text-sm">
              <span>Current Bid:</span>
              <span className="font-semibold">{formatCurrency(auction.currentPrice)}</span>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="bidAmount" className="text-sm font-medium text-gray-700">
                Your Bid Amount
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  id="bidAmount"
                  type="number"
                  step="1"
                  min={auction.currentPrice + 1}
                  className="pl-10"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                />
              </div>
              
              {bidError && (
                <div className="text-auction-danger text-sm flex items-start mt-2">
                  <AlertTriangle className="h-4 w-4 mr-1 flex-shrink-0 mt-0.5" />
                  <span>{bidError}</span>
                </div>
              )}
              
              <div className="text-sm text-gray-500 flex items-start mt-2">
                <Info className="h-4 w-4 mr-1 flex-shrink-0 mt-0.5" />
                <span>
                  By placing a bid, you agree to the auction terms and conditions.
                  If you are the winning bidder, you are committed to completing the purchase.
                </span>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBidDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleBidSubmit} 
              disabled={placingBid}
              className="bg-auction-secondary hover:bg-auction-highlight"
            >
              {placingBid ? 'Processing...' : 'Confirm Bid'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default AuctionDetail;
