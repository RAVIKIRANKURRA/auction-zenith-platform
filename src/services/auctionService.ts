
// Mock data for auctions

export interface Bid {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  timestamp: Date;
}

export interface AuctionItem {
  id: string;
  title: string;
  description: string;
  sellerId: string;
  sellerName: string;
  category: string;
  startingPrice: number;
  currentPrice: number;
  images: string[];
  startDate: Date;
  endDate: Date;
  bids: Bid[];
  status: 'active' | 'closed' | 'pending';
}

// Mock auction items
let mockAuctions: AuctionItem[] = [
  {
    id: '1',
    title: 'Vintage Mechanical Watch',
    description: 'A beautiful 1960s Swiss mechanical watch in excellent condition. Features a 36mm stainless steel case, automatic movement, and original leather strap.',
    sellerId: '2',
    sellerName: 'Seller User',
    category: 'Watches',
    startingPrice: 500,
    currentPrice: 650,
    images: ['https://images.unsplash.com/photo-1508057198894-247b23fe5ade?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'],
    startDate: new Date(Date.now() - 86400000), // 1 day ago
    endDate: new Date(Date.now() + 172800000), // 2 days from now
    bids: [
      {
        id: '101',
        userId: '3',
        userName: 'Bidder User',
        amount: 650,
        timestamp: new Date(Date.now() - 3600000)
      },
      {
        id: '100',
        userId: '4',
        userName: 'Jane Doe',
        amount: 600,
        timestamp: new Date(Date.now() - 7200000)
      }
    ],
    status: 'active'
  },
  {
    id: '2',
    title: 'Modern Art Painting',
    description: 'Original abstract painting by contemporary artist Maria Lopez. Acrylic on canvas, 80x120cm, signed by the artist. Certificate of authenticity included.',
    sellerId: '2',
    sellerName: 'Seller User',
    category: 'Art',
    startingPrice: 1200,
    currentPrice: 1500,
    images: ['https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'],
    startDate: new Date(Date.now() - 172800000), // 2 days ago
    endDate: new Date(Date.now() + 259200000), // 3 days from now
    bids: [
      {
        id: '102',
        userId: '5',
        userName: 'John Smith',
        amount: 1500,
        timestamp: new Date(Date.now() - 10800000)
      },
      {
        id: '103',
        userId: '3',
        userName: 'Bidder User',
        amount: 1350,
        timestamp: new Date(Date.now() - 14400000)
      }
    ],
    status: 'active'
  },
  {
    id: '3',
    title: 'Antique Oak Desk',
    description: 'Beautiful 19th century oak writing desk with original hardware and a leather writing surface. Features three drawers and ornate carved details.',
    sellerId: '6',
    sellerName: 'Antique Dealer',
    category: 'Furniture',
    startingPrice: 800,
    currentPrice: 1100,
    images: ['https://images.unsplash.com/photo-1554295405-abb8fd54f153?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'],
    startDate: new Date(Date.now() - 259200000), // 3 days ago
    endDate: new Date(Date.now() + 86400000), // 1 day from now
    bids: [
      {
        id: '104',
        userId: '7',
        userName: 'Furniture Collector',
        amount: 1100,
        timestamp: new Date(Date.now() - 18000000)
      },
      {
        id: '105',
        userId: '8',
        userName: 'Interior Designer',
        amount: 950,
        timestamp: new Date(Date.now() - 25200000)
      }
    ],
    status: 'active'
  },
  {
    id: '4',
    title: 'Rare First Edition Book',
    description: 'First edition of "The Great Gatsby" by F. Scott Fitzgerald, 1925. In excellent condition with original dust jacket. A true collector\'s item.',
    sellerId: '9',
    sellerName: 'Book Dealer',
    category: 'Books',
    startingPrice: 15000,
    currentPrice: 18500,
    images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'],
    startDate: new Date(Date.now() - 432000000), // 5 days ago
    endDate: new Date(Date.now() + 432000000), // 5 days from now
    bids: [
      {
        id: '106',
        userId: '10',
        userName: 'Book Collector',
        amount: 18500,
        timestamp: new Date(Date.now() - 36000000)
      },
      {
        id: '107',
        userId: '11',
        userName: 'Literature Professor',
        amount: 17200,
        timestamp: new Date(Date.now() - 43200000)
      }
    ],
    status: 'active'
  }
];

// Get all auction items
export const getAuctions = async (filter?: {
  category?: string;
  status?: 'active' | 'closed' | 'pending';
  sellerId?: string;
}): Promise<AuctionItem[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let filteredAuctions = [...mockAuctions];
  
  if (filter?.category) {
    filteredAuctions = filteredAuctions.filter(item => item.category === filter.category);
  }
  
  if (filter?.status) {
    filteredAuctions = filteredAuctions.filter(item => item.status === filter.status);
  }
  
  if (filter?.sellerId) {
    filteredAuctions = filteredAuctions.filter(item => item.sellerId === filter.sellerId);
  }
  
  return filteredAuctions;
};

// Get auction item by ID
export const getAuctionById = async (id: string): Promise<AuctionItem | null> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const auction = mockAuctions.find(item => item.id === id);
  return auction || null;
};

// Place a bid
export const placeBid = async (
  auctionId: string,
  userId: string,
  userName: string,
  amount: number
): Promise<Bid> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const auction = mockAuctions.find(item => item.id === auctionId);
  
  if (!auction) {
    throw new Error('Auction not found');
  }
  
  if (auction.status !== 'active') {
    throw new Error('Auction is not active');
  }
  
  if (auction.endDate < new Date()) {
    auction.status = 'closed';
    throw new Error('Auction has ended');
  }
  
  if (amount <= auction.currentPrice) {
    throw new Error('Bid amount must be higher than current price');
  }
  
  const newBid: Bid = {
    id: Math.random().toString(36).substr(2, 9),
    userId,
    userName,
    amount,
    timestamp: new Date()
  };
  
  auction.bids.unshift(newBid);
  auction.currentPrice = amount;
  
  return newBid;
};

// Create a new auction
export const createAuction = async (
  title: string,
  description: string,
  sellerId: string,
  sellerName: string,
  category: string,
  startingPrice: number,
  images: string[],
  endDate: Date
): Promise<AuctionItem> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newAuction: AuctionItem = {
    id: Math.random().toString(36).substr(2, 9),
    title,
    description,
    sellerId,
    sellerName,
    category,
    startingPrice,
    currentPrice: startingPrice,
    images,
    startDate: new Date(),
    endDate,
    bids: [],
    status: 'active'
  };
  
  mockAuctions.push(newAuction);
  
  return newAuction;
};

// Update auction status
export const updateAuctionStatus = async (
  auctionId: string,
  status: 'active' | 'closed' | 'pending'
): Promise<AuctionItem> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const auction = mockAuctions.find(item => item.id === auctionId);
  
  if (!auction) {
    throw new Error('Auction not found');
  }
  
  auction.status = status;
  
  return auction;
};

// Helper function to format currency
export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });
};

// Helper function to calculate time remaining
export const calculateTimeRemaining = (endDate: Date): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isEnded: boolean;
} => {
  const now = new Date();
  const difference = endDate.getTime() - now.getTime();
  
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isEnded: true };
  }
  
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  
  return { days, hours, minutes, seconds, isEnded: false };
};
