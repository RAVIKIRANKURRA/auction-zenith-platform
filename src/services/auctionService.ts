
import { v4 as uuidv4 } from 'uuid';

// Helper to generate random date within range
const randomDate = (start: Date, end: Date): string => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
};

// Types for auction service
export interface AuctionItem {
  id: string;
  title: string;
  description: string;
  images: string[];
  startingPrice: number;
  currentPrice: number;
  minIncrement: number;
  startDate: string;
  endDate: string;
  seller: User;
  sellerName: string;
  category: string;
  condition: string;
  status: 'pending' | 'active' | 'closed';
  bids: Bid[];
  featured?: boolean;
}

export interface Bid {
  id: string;
  amount: number;
  timestamp: string;
  bidder: User;
  userName: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'seller' | 'bidder';
}

export interface AuctionFilter {
  category?: string;
  status?: string;
  seller?: string;
  featured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

// Mock data
const users = [
  {
    id: "user1",
    name: "Ravi Kumar",
    email: "ravi@rsgmauctions.com",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    role: "admin" as 'admin'
  },
  {
    id: "user2",
    name: "Shiva Reddy",
    email: "shiva@rsgmauctions.com",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    role: "seller" as 'seller'
  },
  {
    id: "user3",
    name: "Gowtham Patel",
    email: "gowtham@rsgmauctions.com",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    role: "seller" as 'seller'
  },
  {
    id: "user4",
    name: "Manoj Singh",
    email: "manoj@rsgmauctions.com",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    role: "bidder" as 'bidder'
  },
  {
    id: "user5",
    name: "Priya Sharma",
    email: "priya@example.com",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    role: "bidder" as 'bidder'
  },
  {
    id: "user6",
    name: "Vikram Malhotra",
    email: "vikram@example.com",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    role: "bidder" as 'bidder'
  },
  {
    id: "user7",
    name: "Ananya Desai",
    email: "ananya@example.com",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    role: "bidder" as 'bidder'
  }
];

// Create mock auctions
const createMockAuctions = (): AuctionItem[] => {
  return [
    {
      id: "auction1",
      title: "Vintage Brass Maharaja Sculpture",
      description: "Exquisite 19th century brass sculpture of an Indian Maharaja on horseback. This piece showcases the intricate craftsmanship of traditional Indian metalwork with fine details and patina of age. Height: 30cm.",
      images: [
        "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
      ],
      startingPrice: 15000,
      currentPrice: 22500,
      minIncrement: 1000,
      startDate: randomDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()),
      endDate: randomDate(new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)),
      seller: users[1],
      sellerName: users[1].name,
      category: "Art",
      condition: "Good",
      status: "active",
      bids: [
        {
          id: uuidv4(),
          amount: 16000,
          timestamp: randomDate(new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), new Date()),
          bidder: users[3],
          userName: users[3].name
        },
        {
          id: uuidv4(),
          amount: 18000,
          timestamp: randomDate(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), new Date()),
          bidder: users[4],
          userName: users[4].name
        },
        {
          id: uuidv4(),
          amount: 22500,
          timestamp: randomDate(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), new Date()),
          bidder: users[6],
          userName: users[6].name
        }
      ],
      featured: true
    },
    {
      id: "auction2",
      title: "1940s HMV Gramophone Record Player",
      description: "Fully functional antique HMV (His Master's Voice) gramophone record player from the 1940s. This iconic piece of music history features the original brass horn, hand crank mechanism, and wooden cabinet with minimal wear.",
      images: ["https://images.unsplash.com/photo-1487958449943-2429e8be8625"],
      startingPrice: 38000,
      currentPrice: 42000,
      minIncrement: 2000,
      startDate: randomDate(new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), new Date()),
      endDate: randomDate(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
      seller: users[2],
      sellerName: users[2].name,
      category: "Electronics",
      condition: "Excellent",
      status: "active",
      bids: [
        {
          id: uuidv4(),
          amount: 40000,
          timestamp: randomDate(new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), new Date()),
          bidder: users[4],
          userName: users[4].name
        },
        {
          id: uuidv4(),
          amount: 42000,
          timestamp: randomDate(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), new Date()),
          bidder: users[5],
          userName: users[5].name
        }
      ],
      featured: true
    },
    {
      id: "auction3",
      title: "Antique Tanjore Painting of Krishna",
      description: "Beautiful 19th century Tanjore painting depicting Lord Krishna with traditional gold leaf work, precious stones, and vibrant colors. This piece comes from a noble family collection in Tamil Nadu and has been professionally restored and framed.",
      images: ["https://images.unsplash.com/photo-1582562124811-c09040d0a901"],
      startingPrice: 75000,
      currentPrice: 92000,
      minIncrement: 5000,
      startDate: randomDate(new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), new Date()),
      endDate: randomDate(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)),
      seller: users[1],
      sellerName: users[1].name,
      category: "Art",
      condition: "Very Good",
      status: "active",
      bids: [
        {
          id: uuidv4(),
          amount: 80000,
          timestamp: randomDate(new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), new Date()),
          bidder: users[6],
          userName: users[6].name
        },
        {
          id: uuidv4(),
          amount: 85000,
          timestamp: randomDate(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), new Date()),
          bidder: users[3],
          userName: users[3].name
        },
        {
          id: uuidv4(),
          amount: 92000,
          timestamp: randomDate(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), new Date()),
          bidder: users[5],
          userName: users[5].name
        }
      ]
    },
    {
      id: "auction4",
      title: "Vintage Rolex Oyster Perpetual Watch",
      description: "Authentic 1960s Rolex Oyster Perpetual in stainless steel with original dial and movement. This classic timepiece has been serviced by a certified watchmaker and keeps excellent time.",
      images: ["https://images.unsplash.com/photo-1721322800607-8c38375eef04"],
      startingPrice: 180000,
      currentPrice: 205000,
      minIncrement: 5000,
      startDate: randomDate(new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), new Date()),
      endDate: randomDate(new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), new Date(Date.now() + 12 * 24 * 60 * 60 * 1000)),
      seller: users[2],
      sellerName: users[2].name,
      category: "Watches",
      condition: "Excellent",
      status: "active",
      bids: [
        {
          id: uuidv4(),
          amount: 185000,
          timestamp: randomDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()),
          bidder: users[3],
          userName: users[3].name
        },
        {
          id: uuidv4(),
          amount: 195000,
          timestamp: randomDate(new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), new Date()),
          bidder: users[4],
          userName: users[4].name
        },
        {
          id: uuidv4(),
          amount: 205000,
          timestamp: randomDate(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), new Date()),
          bidder: users[6],
          userName: users[6].name
        }
      ],
      featured: true
    },
    {
      id: "auction5",
      title: "Rare Silver Colonial-Era Indian Coins",
      description: "Collection of 12 silver coins from British India, dating from 1835-1947. Includes rare specimens featuring portraits of Queen Victoria, King Edward VII, and King George V and VI. Each coin has been authenticated and comes with a certificate.",
      images: ["https://images.unsplash.com/photo-1543699936-c901ddbf0c05"],
      startingPrice: 25000,
      currentPrice: 36000,
      minIncrement: 1000,
      startDate: randomDate(new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), new Date()),
      endDate: randomDate(new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), new Date(Date.now() + 9 * 24 * 60 * 60 * 1000)),
      seller: users[1],
      sellerName: users[1].name,
      category: "Coins",
      condition: "Very Good",
      status: "active",
      bids: [
        {
          id: uuidv4(),
          amount: 26000,
          timestamp: randomDate(new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), new Date()),
          bidder: users[5],
          userName: users[5].name
        },
        {
          id: uuidv4(),
          amount: 30000,
          timestamp: randomDate(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), new Date()),
          bidder: users[3],
          userName: users[3].name
        },
        {
          id: uuidv4(),
          amount: 36000,
          timestamp: randomDate(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), new Date()),
          bidder: users[6],
          userName: users[6].name
        }
      ]
    },
    {
      id: "auction6",
      title: "Antique Rosewood Carved Chaise Lounge",
      description: "Exquisite 19th century rosewood chaise lounge with intricate hand-carved details and original red velvet upholstery. This piece exemplifies the finest craftsmanship of colonial-era Indian furniture.",
      images: ["https://images.unsplash.com/photo-1550581190-9c1c48d21d6c"],
      startingPrice: 48000,
      currentPrice: 65000,
      minIncrement: 3000,
      startDate: randomDate(new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), new Date()),
      endDate: randomDate(new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)),
      seller: users[2],
      sellerName: users[2].name,
      category: "Furniture",
      condition: "Good",
      status: "active",
      bids: [
        {
          id: uuidv4(),
          amount: 51000,
          timestamp: randomDate(new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), new Date()),
          bidder: users[4],
          userName: users[4].name
        },
        {
          id: uuidv4(),
          amount: 58000,
          timestamp: randomDate(new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), new Date()),
          bidder: users[5],
          userName: users[5].name
        },
        {
          id: uuidv4(),
          amount: 65000,
          timestamp: randomDate(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), new Date()),
          bidder: users[3],
          userName: users[3].name
        }
      ],
      featured: true
    },
    {
      id: "auction7",
      title: "Vintage Silk Banarasi Saree",
      description: "Stunning pure silk Banarasi saree from the 1950s with real gold zari work. This exquisite piece features traditional motifs of peacocks and lotus flowers in vibrant red and gold. Comes with original blouse piece and presentation box.",
      images: ["https://images.unsplash.com/photo-1523194258983-4981bbd7d403"],
      startingPrice: 32000,
      currentPrice: 47000,
      minIncrement: 2000,
      startDate: randomDate(new Date(Date.now() - 11 * 24 * 60 * 60 * 1000), new Date()),
      endDate: randomDate(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), new Date(Date.now() + 8 * 24 * 60 * 60 * 1000)),
      seller: users[1],
      sellerName: users[1].name,
      category: "Clothing",
      condition: "Excellent",
      status: "active",
      bids: [
        {
          id: uuidv4(),
          amount: 34000,
          timestamp: randomDate(new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), new Date()),
          bidder: users[6],
          userName: users[6].name
        },
        {
          id: uuidv4(),
          amount: 41000,
          timestamp: randomDate(new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), new Date()),
          bidder: users[4],
          userName: users[4].name
        },
        {
          id: uuidv4(),
          amount: 47000,
          timestamp: randomDate(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), new Date()),
          bidder: users[5],
          userName: users[5].name
        }
      ]
    },
    {
      id: "auction8",
      title: "First Edition 'Discovery of India' by Nehru",
      description: "Rare first edition of 'The Discovery of India' by Jawaharlal Nehru, published in 1946. This hardcover copy is in remarkable condition with original dust jacket and includes a personal inscription from the author.",
      images: ["https://images.unsplash.com/photo-1476275466078-4007374efbbe"],
      startingPrice: 18000,
      currentPrice: 26500,
      minIncrement: 1000,
      startDate: randomDate(new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), new Date()),
      endDate: randomDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), new Date(Date.now() + 11 * 24 * 60 * 60 * 1000)),
      seller: users[2],
      sellerName: users[2].name,
      category: "Books",
      condition: "Very Good",
      status: "active",
      bids: [
        {
          id: uuidv4(),
          amount: 19000,
          timestamp: randomDate(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), new Date()),
          bidder: users[3],
          userName: users[3].name
        },
        {
          id: uuidv4(),
          amount: 23000,
          timestamp: randomDate(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), new Date()),
          bidder: users[5],
          userName: users[5].name
        },
        {
          id: uuidv4(),
          amount: 26500,
          timestamp: randomDate(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), new Date()),
          bidder: users[4],
          userName: users[4].name
        }
      ]
    },
    {
      id: "auction9",
      title: "Vintage Silver Kundan Jewellery Set",
      description: "Exquisite 1920s silver kundan necklace, earrings, and tikka set featuring emeralds, rubies, and pearl detailing. This traditional bridal set from a Rajasthani royal family showcases exemplary craftsmanship of the era.",
      images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908"],
      startingPrice: 120000,
      currentPrice: 155000,
      minIncrement: 5000,
      startDate: randomDate(new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), new Date()),
      endDate: randomDate(new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), new Date(Date.now() + 9 * 24 * 60 * 60 * 1000)),
      seller: users[1],
      sellerName: users[1].name,
      category: "Jewelry",
      condition: "Excellent",
      status: "active",
      bids: [
        {
          id: uuidv4(),
          amount: 125000,
          timestamp: randomDate(new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), new Date()),
          bidder: users[6],
          userName: users[6].name
        },
        {
          id: uuidv4(),
          amount: 140000,
          timestamp: randomDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()),
          bidder: users[4],
          userName: users[4].name
        },
        {
          id: uuidv4(),
          amount: 155000,
          timestamp: randomDate(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), new Date()),
          bidder: users[5],
          userName: users[5].name
        }
      ]
    },
    {
      id: "auction10",
      title: "Antique Bronze Nataraja Statue",
      description: "Magnificent early 20th century bronze statue of Lord Shiva as Nataraja, the cosmic dancer. This impressive piece stands 45cm tall and displays exceptional detailing in the traditional Chola style with a beautiful patina.",
      images: ["https://images.unsplash.com/photo-1582978849846-03e4daa365f3"],
      startingPrice: 85000,
      currentPrice: 108000,
      minIncrement: 3000,
      startDate: randomDate(new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), new Date()),
      endDate: randomDate(new Date(Date.now() + 8 * 24 * 60 * 60 * 1000), new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)),
      seller: users[2],
      sellerName: users[2].name,
      category: "Art",
      condition: "Very Good",
      status: "active",
      bids: [
        {
          id: uuidv4(),
          amount: 88000,
          timestamp: randomDate(new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), new Date()),
          bidder: users[3],
          userName: users[3].name
        },
        {
          id: uuidv4(),
          amount: 95000,
          timestamp: randomDate(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), new Date()),
          bidder: users[4],
          userName: users[4].name
        },
        {
          id: uuidv4(),
          amount: 108000,
          timestamp: randomDate(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), new Date()),
          bidder: users[6],
          userName: users[6].name
        }
      ]
    },
    {
      id: "auction11",
      title: "1940s Vintage Bollywood Movie Posters Collection",
      description: "Rare collection of five original hand-painted Bollywood movie posters from the 1940s, including classics starring Nargis, Raj Kapoor, and Dilip Kumar. These large format posters have been professionally restored and mounted for preservation.",
      images: ["https://images.unsplash.com/photo-1616832880554-b8711dee05c3"],
      startingPrice: 42000,
      currentPrice: 56000,
      minIncrement: 2000,
      startDate: randomDate(new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), new Date()),
      endDate: randomDate(new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)),
      seller: users[1],
      sellerName: users[1].name,
      category: "Art",
      condition: "Good",
      status: "active",
      bids: [
        {
          id: uuidv4(),
          amount: 44000,
          timestamp: randomDate(new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), new Date()),
          bidder: users[5],
          userName: users[5].name
        },
        {
          id: uuidv4(),
          amount: 50000,
          timestamp: randomDate(new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), new Date()),
          bidder: users[3],
          userName: users[3].name
        },
        {
          id: uuidv4(),
          amount: 56000,
          timestamp: randomDate(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), new Date()),
          bidder: users[4],
          userName: users[4].name
        }
      ]
    },
    {
      id: "auction12",
      title: "Vintage Ceylon Sapphire Ring",
      description: "Stunning 1930s Art Deco 18k gold ring featuring a 3.5 carat natural Ceylon sapphire surrounded by diamond accents. This elegant piece comes with gemological certification and original jeweler's box.",
      images: ["https://images.unsplash.com/photo-1611652022419-a9419f74343d"],
      startingPrice: 230000,
      currentPrice: 280000,
      minIncrement: 10000,
      startDate: randomDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()),
      endDate: randomDate(new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), new Date(Date.now() + 12 * 24 * 60 * 60 * 1000)),
      seller: users[2],
      sellerName: users[2].name,
      category: "Jewelry",
      condition: "Excellent",
      status: "active",
      bids: [
        {
          id: uuidv4(),
          amount: 240000,
          timestamp: randomDate(new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), new Date()),
          bidder: users[6],
          userName: users[6].name
        },
        {
          id: uuidv4(),
          amount: 260000,
          timestamp: randomDate(new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), new Date()),
          bidder: users[4],
          userName: users[4].name
        },
        {
          id: uuidv4(),
          amount: 280000,
          timestamp: randomDate(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), new Date()),
          bidder: users[5],
          userName: users[5].name
        }
      ],
      featured: true
    }
  ];
};

// Initialize mock auctions
const mockAuctions: AuctionItem[] = createMockAuctions();

// Format currency to Indian Rupees
export const formatCurrency = (amount: number, withSymbol: boolean = true): string => {
  // Format with comma separators for Indian number system (lakhs and crores)
  const formattedAmount = amount.toLocaleString('en-IN');
  return withSymbol ? `₹${formattedAmount}` : formattedAmount;
};

// Calculate time remaining for auction
export const calculateTimeRemaining = (endDate: string): string => {
  const end = new Date(endDate).getTime();
  const now = new Date().getTime();
  const difference = end - now;
  
  if (difference <= 0) {
    return "Auction ended";
  }
  
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days > 0) {
    return `${days}d ${hours}h remaining`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m remaining`;
  } else {
    return `${minutes}m remaining`;
  }
};

// Mock API functions
export const getAuctions = (filter: AuctionFilter = {}): Promise<AuctionItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = [...mockAuctions];
      
      // Apply filters
      if (filter.category && filter.category !== 'all') {
        filtered = filtered.filter((auction) => auction.category === filter.category);
      }
      
      if (filter.status) {
        filtered = filtered.filter((auction) => auction.status === filter.status);
      }
      
      if (filter.seller) {
        filtered = filtered.filter((auction) => auction.seller.id === filter.seller);
      }
      
      if (filter.featured) {
        filtered = filtered.filter((auction) => auction.featured);
      }
      
      if (filter.minPrice) {
        filtered = filtered.filter((auction) => auction.currentPrice >= filter.minPrice);
      }
      
      if (filter.maxPrice) {
        filtered = filtered.filter((auction) => auction.currentPrice <= filter.maxPrice);
      }
      
      if (filter.search) {
        const searchLower = filter.search.toLowerCase();
        filtered = filtered.filter((auction) => 
          auction.title.toLowerCase().includes(searchLower) || 
          auction.description.toLowerCase().includes(searchLower) || 
          auction.category.toLowerCase().includes(searchLower)
        );
      }
      
      resolve(filtered);
    }, 800); // Fixed the missing closing parenthesis and increased timeout for better UX
  });
};

// Get auction by ID
export const getAuctionById = (id: string): Promise<AuctionItem | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const auction = mockAuctions.find((a) => a.id === id) || null;
      resolve(auction);
    }, 500);
  });
};

// Place bid on an auction
export const placeBid = (auctionId: string, userId: string, amount: number): Promise<AuctionItem> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const auctionIndex = mockAuctions.findIndex((a) => a.id === auctionId);
      
      if (auctionIndex === -1) {
        reject(new Error("Auction not found"));
        return;
      }
      
      const auction = mockAuctions[auctionIndex];
      
      if (auction.status !== 'active') {
        reject(new Error("This auction is not active"));
        return;
      }
      
      const now = new Date();
      const endDate = new Date(auction.endDate);
      
      if (now > endDate) {
        reject(new Error("This auction has ended"));
        return;
      }
      
      if (amount <= auction.currentPrice) {
        reject(new Error(`Your bid must be higher than the current bid (${formatCurrency(auction.currentPrice)})`));
        return;
      }
      
      const user = users.find((u) => u.id === userId);
      
      if (!user) {
        reject(new Error("User not found"));
        return;
      }
      
      const newBid: Bid = {
        id: uuidv4(),
        amount: amount,
        timestamp: new Date().toISOString(),
        bidder: user,
        userName: user.name
      };
      
      // Create a new auction object with updated bid
      const updatedAuction = {
        ...auction,
        currentPrice: amount,
        bids: [newBid, ...auction.bids]
      };
      
      // Update the auction in the mock data
      mockAuctions[auctionIndex] = updatedAuction;
      
      resolve(updatedAuction);
    }, 800);
  });
};

// Get featured auctions
export const getFeaturedAuctions = (): Promise<AuctionItem[]> => {
  return getAuctions({ featured: true });
};

// Get auctions by category
export const getAuctionsByCategory = (category: string): Promise<AuctionItem[]> => {
  return getAuctions({ category });
};

// Get auctions by seller
export const getAuctionsBySeller = (sellerId: string): Promise<AuctionItem[]> => {
  return getAuctions({ seller: sellerId });
};

// Search auctions
export const searchAuctions = (query: string): Promise<AuctionItem[]> => {
  return getAuctions({ search: query });
};

// Update auction status
export const updateAuctionStatus = (id: string, status: 'pending' | 'active' | 'closed'): Promise<AuctionItem> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const auctionIndex = mockAuctions.findIndex((a) => a.id === id);
      
      if (auctionIndex === -1) {
        reject(new Error("Auction not found"));
        return;
      }
      
      const updatedAuction = {
        ...mockAuctions[auctionIndex],
        status
      };
      
      mockAuctions[auctionIndex] = updatedAuction;
      
      resolve(updatedAuction);
    }, 500);
  });
};
