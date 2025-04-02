
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Gavel, LogIn, User } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/Layout';

type AuthTab = 'login' | 'register';

const Auth = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [activeTab, setActiveTab] = useState<AuthTab>('login');
  const [isLoading, setIsLoading] = useState(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Register form state
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [registerRole, setRegisterRole] = useState<'bidder' | 'seller'>('bidder');
  const [registerError, setRegisterError] = useState('');
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    if (!loginEmail || !loginPassword) {
      setLoginError('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    try {
      await login(loginEmail, loginPassword);
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        setLoginError(error.message);
      } else {
        setLoginError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');
    
    if (!registerName || !registerEmail || !registerPassword || !registerConfirmPassword) {
      setRegisterError('Please fill in all fields');
      return;
    }
    
    if (registerPassword !== registerConfirmPassword) {
      setRegisterError('Passwords do not match');
      return;
    }
    
    if (registerPassword.length < 6) {
      setRegisterError('Password must be at least 6 characters');
      return;
    }
    
    setIsLoading(true);
    try {
      await register(registerName, registerEmail, registerPassword, registerRole);
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        setRegisterError(error.message);
      } else {
        setRegisterError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Layout>
      <div className="container max-w-md mx-auto py-12 px-4">
        <div className="text-center mb-8">
          <Gavel className="h-12 w-12 text-auction-secondary mx-auto mb-2" />
          <h1 className="text-2xl font-bold">Welcome to Auction Zenith</h1>
          <p className="text-gray-600 mt-2">Your premier online auction platform</p>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as AuthTab)}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <a href="#" className="text-sm text-auction-primary hover:underline">
                        Forgot password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  {loginError && (
                    <div className="text-auction-danger text-sm font-medium">
                      {loginError}
                    </div>
                  )}
                  
                  <Button
                    type="submit"
                    className="w-full bg-auction-primary hover:bg-auction-primary/90"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Logging in...' : (
                      <>
                        <LogIn className="h-4 w-4 mr-2" />
                        Sign In
                      </>
                    )}
                  </Button>
                  
                  <div className="text-center text-sm text-gray-500 mt-4">
                    <span>Don't have an account? </span>
                    <button
                      type="button"
                      className="text-auction-primary hover:underline font-medium"
                      onClick={() => setActiveTab('register')}
                    >
                      Register
                    </button>
                  </div>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="you@example.com"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      value={registerConfirmPassword}
                      onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Account Type</Label>
                    <RadioGroup 
                      value={registerRole} 
                      onValueChange={(value) => setRegisterRole(value as 'bidder' | 'seller')}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bidder" id="bidder" />
                        <Label htmlFor="bidder" className="cursor-pointer">Bidder</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="seller" id="seller" />
                        <Label htmlFor="seller" className="cursor-pointer">Seller</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  {registerError && (
                    <div className="text-auction-danger text-sm font-medium">
                      {registerError}
                    </div>
                  )}
                  
                  <Button
                    type="submit"
                    className="w-full bg-auction-primary hover:bg-auction-primary/90"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating account...' : (
                      <>
                        <User className="h-4 w-4 mr-2" />
                        Create Account
                      </>
                    )}
                  </Button>
                  
                  <div className="text-center text-sm text-gray-500 mt-4">
                    <span>Already have an account? </span>
                    <button
                      type="button"
                      className="text-auction-primary hover:underline font-medium"
                      onClick={() => setActiveTab('login')}
                    >
                      Sign in
                    </button>
                  </div>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
