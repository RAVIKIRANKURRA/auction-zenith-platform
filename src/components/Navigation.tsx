
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, LogOut, LogIn, Menu, X, Gavel, 
  PackagePlus, Home, ShoppingBag, Settings 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const { user, logout, isAuthenticated, isAdmin, isSeller } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-auction-primary text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Gavel className="h-8 w-8 mr-2 text-auction-secondary" />
              <span className="text-xl font-bold">Auction Zenith</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="hover:text-auction-secondary transition-colors">
              Home
            </Link>
            <Link to="/auctions" className="hover:text-auction-secondary transition-colors">
              Auctions
            </Link>
            {isSeller && (
              <Link to="/create-listing" className="hover:text-auction-secondary transition-colors">
                Create Listing
              </Link>
            )}
            {isAdmin && (
              <Link to="/admin" className="hover:text-auction-secondary transition-colors">
                Admin Dashboard
              </Link>
            )}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="hover:text-auction-secondary transition-colors">
                    <User className="h-5 w-5 mr-1" />
                    {user?.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/my-bids')}>
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    <span>My Bids</span>
                  </DropdownMenuItem>
                  {isSeller && (
                    <DropdownMenuItem onClick={() => navigate('/my-listings')}>
                      <PackagePlus className="mr-2 h-4 w-4" />
                      <span>My Listings</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate('/login')}
                  className="bg-transparent text-white border-white hover:bg-white hover:text-auction-primary"
                >
                  <LogIn className="h-4 w-4 mr-1" />
                  Login
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={() => navigate('/register')}
                  className="bg-auction-secondary hover:bg-auction-highlight text-white"
                >
                  <User className="h-4 w-4 mr-1" />
                  Register
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleMobileMenu}
              className="text-white hover:text-auction-secondary"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link 
              to="/" 
              className="block py-2 px-4 hover:bg-auction-secondary/10 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home className="h-4 w-4 inline mr-2" />
              Home
            </Link>
            <Link 
              to="/auctions" 
              className="block py-2 px-4 hover:bg-auction-secondary/10 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Gavel className="h-4 w-4 inline mr-2" />
              Auctions
            </Link>
            {isSeller && (
              <Link 
                to="/create-listing" 
                className="block py-2 px-4 hover:bg-auction-secondary/10 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                <PackagePlus className="h-4 w-4 inline mr-2" />
                Create Listing
              </Link>
            )}
            {isAdmin && (
              <Link 
                to="/admin" 
                className="block py-2 px-4 hover:bg-auction-secondary/10 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Settings className="h-4 w-4 inline mr-2" />
                Admin Dashboard
              </Link>
            )}
            {isAuthenticated ? (
              <>
                <Link 
                  to="/profile" 
                  className="block py-2 px-4 hover:bg-auction-secondary/10 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-4 w-4 inline mr-2" />
                  Profile
                </Link>
                <Link 
                  to="/my-bids" 
                  className="block py-2 px-4 hover:bg-auction-secondary/10 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ShoppingBag className="h-4 w-4 inline mr-2" />
                  My Bids
                </Link>
                {isSeller && (
                  <Link 
                    to="/my-listings" 
                    className="block py-2 px-4 hover:bg-auction-secondary/10 rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <PackagePlus className="h-4 w-4 inline mr-2" />
                    My Listings
                  </Link>
                )}
                <button 
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 px-4 hover:bg-auction-secondary/10 rounded"
                >
                  <LogOut className="h-4 w-4 inline mr-2" />
                  Log out
                </button>
              </>
            ) : (
              <div className="px-4 py-2 flex flex-col space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    navigate('/login');
                    setMobileMenuOpen(false);
                  }}
                  className="bg-transparent text-white border-white hover:bg-white hover:text-auction-primary"
                >
                  <LogIn className="h-4 w-4 mr-1" />
                  Login
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={() => {
                    navigate('/register');
                    setMobileMenuOpen(false);
                  }}
                  className="bg-auction-secondary hover:bg-auction-highlight text-white"
                >
                  <User className="h-4 w-4 mr-1" />
                  Register
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
