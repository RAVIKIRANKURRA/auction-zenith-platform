
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import AuctionCard from '@/components/AuctionCard';
import { Button } from '@/components/ui/button';
import { AuctionItem, getAuctions } from '@/services/auctionService';
import { Gavel, ArrowRight, Clock, Tag, Award, ShieldCheck, IndianRupee } from 'lucide-react';

const Home = () => {
  const [featuredAuctions, setFeaturedAuctions] = useState<AuctionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const auctions = await getAuctions({ status: 'active' });
        setFeaturedAuctions(auctions.slice(0, 4));
      } catch (error) {
        console.error('Error fetching auctions:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAuctions();
  }, []);
  
  // Hero Categories
  const categories = [
    { name: 'Art', icon: '🎨' },
    { name: 'Watches', icon: '⌚' },
    { name: 'Jewelry', icon: '💍' },
    { name: 'Furniture', icon: '🪑' },
    { name: 'Books', icon: '📚' },
    { name: 'Vintage', icon: '🏺' },
    { name: 'Coins', icon: '🪙' }
  ];
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-auction-primary text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Welcome to <span className="text-auction-secondary">RSGM Vintage Auctions</span>
              </h1>
              <p className="mt-4 text-lg text-gray-300">
                Discover and bid on exceptional vintage items from around the world, with prices in Indian Rupees.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/auctions')}
                  className="bg-auction-secondary hover:bg-auction-highlight text-white"
                >
                  Browse Auctions
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => navigate('/how-it-works')}
                  className="border-white text-white hover:bg-white hover:text-auction-primary"
                >
                  How It Works
                </Button>
              </div>
              
              {/* Categories */}
              <div className="mt-10">
                <p className="text-sm text-gray-300 mb-3">Popular Categories:</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Link 
                      key={category.name}
                      to={`/auctions?category=${category.name}`} 
                      className="bg-auction-primary/40 backdrop-blur-sm border border-white/10 px-3 py-2 rounded-full text-sm hover:bg-auction-secondary/80 transition-colors"
                    >
                      <span className="mr-1">{category.icon}</span> {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="hidden md:block">
              {/* Hero image */}
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-auction-secondary rounded-full opacity-50"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-auction-secondary rounded-full opacity-30"></div>
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f" 
                  alt="Auction Items" 
                  className="relative z-10 rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* RSGM Ad Banner */}
      <section className="py-8 bg-auction-secondary/10">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-auction-primary to-auction-secondary p-6 rounded-lg shadow-md text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h2 className="text-2xl font-bold mb-2">RSGM Vintage Auctions</h2>
                <p className="text-lg">
                  <span className="font-bold">R</span>avi • 
                  <span className="font-bold ml-2">S</span>hiva • 
                  <span className="font-bold ml-2">G</span>owtham • 
                  <span className="font-bold ml-2">M</span>anoj
                </p>
                <p className="mt-2 text-white/80">Curating the finest vintage collectibles since 2020</p>
              </div>
              <Button 
                onClick={() => navigate('/about')}
                className="bg-white text-auction-primary hover:bg-white/90"
              >
                Our Story
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Giveaway Ad Banner */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="border-2 border-dashed border-auction-secondary p-6 rounded-lg bg-auction-tertiary text-center">
            <div className="animate-pulse inline-block mb-2 bg-auction-secondary text-white px-3 py-1 rounded-full text-sm font-semibold">
              Special Announcement
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-auction-primary mb-2">
              Exciting Giveaway Alert!
            </h2>
            <p className="text-lg mb-4">
              There is a Giveaway in RSGM Vintage Auctions. Participate now and win exclusive collectibles!
            </p>
            <Button 
              onClick={() => navigate('/giveaway')}
              className="bg-auction-secondary hover:bg-auction-highlight text-white"
            >
              Join Giveaway
            </Button>
          </div>
        </div>
      </section>
      
      {/* Featured Auctions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-auction-primary">
              Featured Auctions
            </h2>
            <Link 
              to="/auctions" 
              className="text-auction-primary hover:text-auction-secondary flex items-center transition-colors"
            >
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
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
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredAuctions.map((auction) => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-auction-primary">
              How RSGM Vintage Auctions Works
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Join our community of buyers and sellers for a seamless auction experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-auction-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gavel className="h-8 w-8 text-auction-primary" />
              </div>
              <h3 className="text-xl font-semibold text-auction-primary mb-3">
                Browse & Bid
              </h3>
              <p className="text-gray-600">
                Explore our wide selection of unique vintage items and place bids in Indian Rupees. Set your maximum bid and let our system handle the rest.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-auction-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-auction-primary" />
              </div>
              <h3 className="text-xl font-semibold text-auction-primary mb-3">
                Track Auctions
              </h3>
              <p className="text-gray-600">
                Keep track of your active bids and receive notifications when you're outbid or when an auction is ending soon.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-auction-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-auction-primary" />
              </div>
              <h3 className="text-xl font-semibold text-auction-primary mb-3">
                Win & Receive
              </h3>
              <p className="text-gray-600">
                If you're the highest bidder when the auction ends, you'll be notified to complete the purchase and arrange delivery.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              onClick={() => navigate('/register')}
              className="bg-auction-primary hover:bg-auction-primary/90"
            >
              Join RSGM Vintage Auctions Today
            </Button>
          </div>
        </div>
      </section>
      
      {/* Trust & Security */}
      <section className="py-16 bg-auction-tertiary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-auction-primary">
              Trust & Security
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              We prioritize your safety and security in every auction
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <ShieldCheck className="h-10 w-10 text-auction-secondary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Secure Transactions</h3>
              <p className="text-gray-600 text-sm">
                All financial transactions are processed through our secure payment system with support for Indian Rupees.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Tag className="h-10 w-10 text-auction-secondary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Verified Listings</h3>
              <p className="text-gray-600 text-sm">
                We authenticate and verify items to ensure their quality and authenticity.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <svg className="h-10 w-10 text-auction-secondary mb-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M5 11a5 5 0 1110 0 1 1 0 11-2 0 3 3 0 10-6 0c0 1.677-.345 3.276-.968 4.729a1 1 0 11-1.838-.789A9.964 9.964 0 005 11zm8.921 2.012a1 1 0 01.831 1.145 19.86 19.86 0 01-.545 2.436 1 1 0 11-1.92-.558c.207-.713.371-1.445.49-2.192a1 1 0 011.144-.83z" clipRule="evenodd" />
              </svg>
              <h3 className="text-lg font-semibold mb-2">Buyer Protection</h3>
              <p className="text-gray-600 text-sm">
                Our buyer protection program safeguards your purchases and ensures satisfaction.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <svg className="h-10 w-10 text-auction-secondary mb-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <h3 className="text-lg font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-600 text-sm">
                Our team of experts is available to assist with any questions or concerns.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-auction-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Bidding?
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300 mb-8">
            Join thousands of buyers and sellers on RSGM Vintage Auctions today. Create an account to start bidding on unique vintage items or list your own treasures.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              onClick={() => navigate('/register')}
              className="bg-auction-secondary hover:bg-auction-highlight text-white"
            >
              Create an Account
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/auctions')}
              className="border-white text-white hover:bg-white hover:text-auction-primary"
            >
              Browse Auctions
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
