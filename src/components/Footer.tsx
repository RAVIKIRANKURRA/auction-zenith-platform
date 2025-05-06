
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

interface FooterProps {
  siteName?: string;
}

const Footer = ({ siteName = "Auction Zenith" }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-auction-primary text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{siteName}</h3>
            <p className="text-sm text-gray-300">
              India's premier online marketplace for vintage collectibles, 
              antiques, and rare items from around the world.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-white hover:text-auction-secondary">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-white hover:text-auction-secondary">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-white hover:text-auction-secondary">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-white hover:text-auction-secondary">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-white hover:text-auction-secondary">
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/auctions" className="text-gray-300 hover:text-white">
                  Browse Auctions
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-white">
                  Create Account
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white">
                  Login
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/auctions?category=Art" className="text-gray-300 hover:text-white">
                  Art & Paintings
                </Link>
              </li>
              <li>
                <Link to="/auctions?category=Jewelry" className="text-gray-300 hover:text-white">
                  Jewelry & Watches
                </Link>
              </li>
              <li>
                <Link to="/auctions?category=Furniture" className="text-gray-300 hover:text-white">
                  Antique Furniture
                </Link>
              </li>
              <li>
                <Link to="/auctions?category=Coins" className="text-gray-300 hover:text-white">
                  Coins & Currency
                </Link>
              </li>
              <li>
                <Link to="/auctions?category=Books" className="text-gray-300 hover:text-white">
                  Rare Books
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic text-sm text-gray-300 space-y-2">
              <p>RSGM Vintage Auctions</p>
              <p>123 Heritage Lane,</p>
              <p>Kolkata, West Bengal 700001</p>
              <p className="pt-2">support@rsgmauctions.com</p>
              <p>+91 99555 88777</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between">
            <p>&copy; {currentYear} {siteName}. All rights reserved.</p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white">Terms of Service</Link>
              <Link to="/about" className="hover:text-white">About Us</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
