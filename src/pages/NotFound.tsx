
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Search, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <div className="mb-8">
            <Search className="h-24 w-24 text-gray-300 mx-auto" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-auction-primary mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">
            Oops! We couldn't find what you're looking for.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={() => window.history.back()} variant="outline" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
            <Button asChild className="bg-auction-primary hover:bg-auction-primary/90 flex items-center">
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Return to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
