
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { AuctionItem, getAuctions, updateAuctionStatus, formatCurrency } from '@/services/auctionService';
import { BarChart, Users, Tag, Settings, MoreVertical, Eye, CheckCircle, Clock, AlertTriangle, Ban } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [auctions, setAuctions] = useState<AuctionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAuction, setSelectedAuction] = useState<AuctionItem | null>(null);
  const [actionDialog, setActionDialog] = useState<{
    open: boolean;
    action: 'close' | 'activate' | 'suspend';
    title: string;
    description: string;
  }>({
    open: false, 
    action: 'close', 
    title: '', 
    description: ''
  });
  
  useEffect(() => {
    // Redirect if not admin
    if (user && !isAdmin) {
      navigate('/');
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin dashboard.",
        variant: "destructive"
      });
    }
    
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const auctionsData = await getAuctions();
        setAuctions(auctionsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error loading data",
          description: "Failed to load dashboard data.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    if (isAdmin) {
      fetchData();
    }
  }, [user, isAdmin, navigate]);
  
  const handleAuctionAction = (auction: AuctionItem, action: 'close' | 'activate' | 'suspend') => {
    setSelectedAuction(auction);
    let dialogInfo = {
      open: true,
      action,
      title: '',
      description: ''
    };
    
    switch (action) {
      case 'close':
        dialogInfo.title = "Close Auction";
        dialogInfo.description = `Are you sure you want to close "${auction.title}"? This will end the auction immediately.`;
        break;
      case 'activate':
        dialogInfo.title = "Activate Auction";
        dialogInfo.description = `Are you sure you want to activate "${auction.title}"? This will make the auction visible to all users.`;
        break;
      case 'suspend':
        dialogInfo.title = "Suspend Auction";
        dialogInfo.description = `Are you sure you want to suspend "${auction.title}"? This will hide the auction from users temporarily.`;
        break;
    }
    
    setActionDialog(dialogInfo);
  };
  
  const confirmAction = async () => {
    if (!selectedAuction) return;
    
    try {
      let newStatus: 'active' | 'closed' | 'pending';
      let successMessage = '';
      
      switch (actionDialog.action) {
        case 'close':
          newStatus = 'closed';
          successMessage = 'Auction closed successfully';
          break;
        case 'activate':
          newStatus = 'active';
          successMessage = 'Auction activated successfully';
          break;
        case 'suspend':
          newStatus = 'pending';
          successMessage = 'Auction suspended successfully';
          break;
      }
      
      await updateAuctionStatus(selectedAuction.id, newStatus);
      
      // Update local state
      setAuctions(auctions.map(a => 
        a.id === selectedAuction.id ? { ...a, status: newStatus } : a
      ));
      
      toast({
        title: "Action completed",
        description: successMessage
      });
    } catch (error) {
      console.error('Error updating auction:', error);
      toast({
        title: "Error",
        description: "Failed to update auction status.",
        variant: "destructive"
      });
    } finally {
      setActionDialog({ ...actionDialog, open: false });
      setSelectedAuction(null);
    }
  };
  
  if (!isAdmin) {
    return null;
  }
  
  // Calculate dashboard metrics
  const activeAuctions = auctions.filter(a => a.status === 'active').length;
  const closedAuctions = auctions.filter(a => a.status === 'closed').length;
  const pendingAuctions = auctions.filter(a => a.status === 'pending').length;
  const totalBids = auctions.reduce((total, auction) => total + auction.bids.length, 0);
  const totalUsers = auctions.reduce((users, auction) => {
    // Get unique user IDs from bids
    auction.bids.forEach(bid => users.add(bid.userId));
    // Add seller ID
    users.add(auction.sellerId);
    return users;
  }, new Set()).size;
  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-auction-primary">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Manage auctions, users, and system settings
            </p>
          </div>
        </div>
        
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Auctions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{auctions.length}</div>
              <div className="text-xs text-gray-500 mt-1">
                <span className="text-auction-success">{activeAuctions} active</span> • 
                <span className="text-auction-danger ml-1">{closedAuctions} closed</span> • 
                <span className="text-gray-500 ml-1">{pendingAuctions} pending</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Bids</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalBids}</div>
              <div className="text-xs text-gray-500 mt-1">
                Across all auctions
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalUsers}</div>
              <div className="text-xs text-gray-500 mt-1">
                Unique buyers and sellers
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Avg. Bids Per Auction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {auctions.length ? (totalBids / auctions.length).toFixed(1) : '0'}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Engagement indicator
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Dashboard Content */}
        <Tabs defaultValue="auctions">
          <TabsList className="mb-6">
            <TabsTrigger value="auctions" className="flex items-center">
              <Tag className="h-4 w-4 mr-2" />
              Auctions
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center">
              <BarChart className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="auctions">
            <Card>
              <CardHeader>
                <CardTitle>Manage Auctions</CardTitle>
                <CardDescription>
                  Monitor and manage all auctions in the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-pulse text-center">
                      <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
                      <div className="h-4 bg-gray-300 rounded w-48 mx-auto"></div>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Seller</TableHead>
                          <TableHead>Current Price</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Bids</TableHead>
                          <TableHead>End Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {auctions.map((auction) => (
                          <TableRow key={auction.id}>
                            <TableCell className="font-medium">{auction.title}</TableCell>
                            <TableCell>{auction.category}</TableCell>
                            <TableCell>{auction.sellerName}</TableCell>
                            <TableCell>{formatCurrency(auction.currentPrice)}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                {auction.status === 'active' ? (
                                  <>
                                    <CheckCircle className="h-4 w-4 text-auction-success mr-1" />
                                    <span className="text-auction-success">Active</span>
                                  </>
                                ) : auction.status === 'closed' ? (
                                  <>
                                    <Clock className="h-4 w-4 text-auction-danger mr-1" />
                                    <span className="text-auction-danger">Closed</span>
                                  </>
                                ) : (
                                  <>
                                    <AlertTriangle className="h-4 w-4 text-gray-500 mr-1" />
                                    <span className="text-gray-500">Pending</span>
                                  </>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>{auction.bids.length}</TableCell>
                            <TableCell>
                              {new Date(auction.endDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => navigate(`/auction/${auction.id}`)}>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  {auction.status !== 'closed' && (
                                    <DropdownMenuItem 
                                      onClick={() => handleAuctionAction(auction, 'close')}
                                      className="text-auction-danger"
                                    >
                                      <Clock className="h-4 w-4 mr-2" />
                                      Close Auction
                                    </DropdownMenuItem>
                                  )}
                                  {auction.status !== 'active' && (
                                    <DropdownMenuItem 
                                      onClick={() => handleAuctionAction(auction, 'activate')}
                                      className="text-auction-success"
                                    >
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Activate Auction
                                    </DropdownMenuItem>
                                  )}
                                  {auction.status !== 'pending' && (
                                    <DropdownMenuItem 
                                      onClick={() => handleAuctionAction(auction, 'suspend')}
                                    >
                                      <Ban className="h-4 w-4 mr-2" />
                                      Suspend Auction
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage your users and their roles
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center py-16">
                <div className="text-center">
                  <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">User Management</h3>
                  <p className="text-gray-500 mb-4">This feature will be available in the next update.</p>
                  <Button variant="outline">Coming Soon</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>
                  Track system performance and user activity
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center py-16">
                <div className="text-center">
                  <BarChart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Advanced Analytics</h3>
                  <p className="text-gray-500 mb-4">Detailed analytics will be available in the next update.</p>
                  <Button variant="outline">Coming Soon</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>
                  Configure system parameters and rules
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center py-16">
                <div className="text-center">
                  <Settings className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">System Configuration</h3>
                  <p className="text-gray-500 mb-4">Advanced settings will be available in the next update.</p>
                  <Button variant="outline">Coming Soon</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Action Confirmation Dialog */}
      <Dialog open={actionDialog.open} onOpenChange={(open) => setActionDialog({ ...actionDialog, open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{actionDialog.title}</DialogTitle>
            <DialogDescription>
              {actionDialog.description}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setActionDialog({ ...actionDialog, open: false })}
            >
              Cancel
            </Button>
            <Button 
              variant={actionDialog.action === 'close' ? 'destructive' : 'default'}
              onClick={confirmAction}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default AdminDashboard;
