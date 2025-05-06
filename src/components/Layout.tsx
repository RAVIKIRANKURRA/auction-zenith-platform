
import { ReactNode } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

// Since we're not allowed to modify Navigation or Footer components directly,
// we need to assume they accept siteName as a prop
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
