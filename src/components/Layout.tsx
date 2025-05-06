
import { ReactNode } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation siteName="RSGM Vintage Auctions" />
      <main className="flex-grow">{children}</main>
      <Footer siteName="RSGM Vintage Auctions" />
    </div>
  );
};

export default Layout;
