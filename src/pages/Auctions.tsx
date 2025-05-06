
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import AuctionCard from '@/components/AuctionCard';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { AuctionItem, getAuctions } from '@/services/auctionService';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

const Auctions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [auctions, setAuctions] = useState<AuctionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState('ending-soon');
  
  useEffect(() => {
    const fetchAuctions = async () => {
      setIsLoading(true);
      try {
        const filter: { category?: string; status?: 'active' | 'closed' | 'pending' } = {
          status: 'active'
        };
        
        if (selectedCategory && selectedCategory !== 'all') {
          filter.category = selectedCategory;
        }
        
        const auctionsData = await getAuctions(filter);
        
        // Sort auctions
        let sortedAuctions = [...auctionsData];
        if (sortBy === 'ending-soon') {
          sortedAuctions.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
        } else if (sortBy === 'newest') {
          sortedAuctions.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
        } else if (sortBy === 'price-high') {
          sortedAuctions.sort((a, b) => b.currentPrice - a.currentPrice);
        } else if (sortBy === 'price-low') {
          sortedAuctions.sort((a, b) => a.currentPrice - b.currentPrice);
        } else if (sortBy === 'most-bids') {
          sortedAuctions.sort((a, b) => b.bids.length - a.bids.length);
        }
        
        // Filter by search term if present
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          sortedAuctions = sortedAuctions.filter(
            auction => 
              auction.title.toLowerCase().includes(term) || 
              auction.description.toLowerCase().includes(term)
          );
        }
        
        setAuctions(sortedAuctions);
      } catch (error) {
        console.error('Error fetching auctions:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAuctions();
  }, [selectedCategory, sortBy, searchTerm, searchParams]);
  
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    if (value && value !== 'all') {
      searchParams.set('category', value);
    } else {
      searchParams.delete('category');
    }
    setSearchParams(searchParams);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search will be triggered by the useEffect when searchTerm changes
  };
  
  const clearFilters = () => {
    setSelectedCategory('all');
    setSortBy('ending-soon');
    setSearchTerm('');
    setSearchParams({});
  };
  
  const categories = ['Art', 'Watches', 'Jewelry', 'Furniture', 'Books', 'Collectibles', 'Electronics'];
  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-auction-primary">
              Browse Auctions
            </h1>
            <p className="text-gray-600 mt-1">
              {auctions.length} active {auctions.length === 1 ? 'auction' : 'auctions'} available
            </p>
          </div>
          
          <form onSubmit={handleSearch} className="mt-4 md:mt-0 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search auctions..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </form>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm h-fit">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-auction-primary flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-auction-primary"
              >
                Clear All
              </Button>
            </div>
            
            <div className="space-y-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ending-soon">Ending Soon</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="most-bids">Most Bids</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Additional filters would go here */}
            </div>
          </div>
          
          {/* Auction Listings */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="auction-card animate-pulse">
                    <div className="aspect-square w-full bg-gray-300 rounded-md"></div>
                    <div className="mt-3">
                      <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                      <div className="mt-2 flex justify-between">
                        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                      </div>
                      <div className="mt-2 h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : auctions.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {auctions.map((auction) => (
                  <AuctionCard key={auction.id} auction={auction} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                <SlidersHorizontal className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No auctions found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Auctions;
