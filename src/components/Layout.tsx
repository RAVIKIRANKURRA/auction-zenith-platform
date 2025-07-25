
import { ReactNode } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const siteName = "RSGM Vintage Auctions";
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation siteName={siteName} />
      <main className="flex-grow">{children}</main>
      <Footer siteName={siteName} />
    </div>
  );
};

export default Layout;
