
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';
import { AuctionItem, formatCurrency, getAuctions, updateAuctionStatus } from '@/services/auctionService';
import { MoreHorizontal, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const [auctions, setAuctions] = useState<AuctionItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchAuctions = async () => {
      setLoading(true);
      try {
        const data = await getAuctions();
        setAuctions(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch auction data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchAuctions();
  }, []);
  
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" replace />;
  }
  
  const handleStatusChange = async (auctionId: string, newStatus: 'pending' | 'active' | 'closed') => {
    try {
      await updateAuctionStatus(auctionId, newStatus);
      
      // Update local state
      setAuctions((prevAuctions) => 
        prevAuctions.map((auction) => 
          auction.id === auctionId 
            ? { ...auction, status: newStatus } 
            : auction
        )
      );
      
      toast({
        title: "Status updated",
        description: `Auction has been marked as ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update auction status",
        variant: "destructive",
      });
    }
  };
  
  // Calculate statistics
  const activeAuctions = auctions.filter(a => a.status === 'active').length;
  const pendingAuctions = auctions.filter(a => a.status === 'pending').length;
  const closedAuctions = auctions.filter(a => a.status === 'closed').length;
  
  const totalBids = auctions.reduce((sum, auction) => sum + auction.bids.length, 0);
  
  const categoryData = auctions.reduce((acc, auction) => {
    const category = auction.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category]++;
    return acc;
  }, {} as Record<string, number>);
  
  const chartData = Object.keys(categoryData).map(category => ({
    name: category,
    count: categoryData[category],
  }));
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case 'closed':
        return <Badge className="bg-gray-500">Closed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Auctions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{auctions.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Auctions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{activeAuctions}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Auctions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{pendingAuctions}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Bids
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalBids}</div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="auctions" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="auctions">Auctions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="auctions">
            <Card>
              <CardHeader>
                <CardTitle>Manage Auctions</CardTitle>
                <CardDescription>
                  View and manage all auctions in the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Seller</TableHead>
                        <TableHead>Current Price</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Bids</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {auctions.map((auction) => (
                        <TableRow key={auction.id}>
                          <TableCell className="font-medium">{auction.title}</TableCell>
                          <TableCell>{auction.category}</TableCell>
                          <TableCell>{auction.sellerName}</TableCell>
                          <TableCell>{formatCurrency(auction.currentPrice)}</TableCell>
                          <TableCell>{formatDate(auction.endDate)}</TableCell>
                          <TableCell>{getStatusBadge(auction.status)}</TableCell>
                          <TableCell>{auction.bids.length}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                
                                <DropdownMenuItem 
                                  onClick={() => handleStatusChange(auction.id, 'active')}
                                  className="flex items-center"
                                >
                                  <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                                  <span>Mark Active</span>
                                </DropdownMenuItem>
                                
                                <DropdownMenuItem 
                                  onClick={() => handleStatusChange(auction.id, 'pending')}
                                  className="flex items-center"
                                >
                                  <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                                  <span>Mark Pending</span>
                                </DropdownMenuItem>
                                
                                <DropdownMenuItem 
                                  onClick={() => handleStatusChange(auction.id, 'closed')}
                                  className="flex items-center"
                                >
                                  <XCircle className="mr-2 h-4 w-4 text-gray-500" />
                                  <span>Mark Closed</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Category Distribution</CardTitle>
                <CardDescription>
                  Number of auctions by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 60,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Bids</CardTitle>
            <CardDescription>
              The most recent bids across all auctions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Auction</TableHead>
                    <TableHead>Bidder</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auctions
                    .flatMap(auction => 
                      auction.bids.map(bid => ({
                        auctionTitle: auction.title,
                        auctionId: auction.id,
                        ...bid
                      }))
                    )
                    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                    .slice(0, 10)
                    .map((bid) => (
                      <TableRow key={bid.id}>
                        <TableCell className="font-medium">{bid.auctionTitle}</TableCell>
                        <TableCell>{bid.userName}</TableCell>
                        <TableCell>{formatCurrency(bid.amount)}</TableCell>
                        <TableCell>{formatDate(bid.timestamp)}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
