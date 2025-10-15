import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from '@supabase/supabase-js';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          navigate("/dashboard");
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('signin-email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('signin-password') as HTMLInputElement).value;
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      const message = error.message?.toLowerCase?.() || '';
      if (message.includes('email not confirmed')) {
        const { error: resendError } = await supabase.auth.resend({
          type: 'signup',
          email,
        });
        toast({
          title: resendError ? 'Email confirmation required' : 'Confirm your email',
          description: resendError
            ? 'Please confirm your email before signing in.'
            : 'We sent you a new confirmation link. Please confirm to continue.',
          variant: resendError ? 'destructive' : undefined,
        });
      } else {
        toast({
          title: 'Sign in failed',
          description: error.message,
          variant: 'destructive',
        });
      }
      setIsLoading(false);
    } else {
      toast({
        title: 'Sign in successful!',
        description: 'Welcome back to WasteLess ServeMore',
      });
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('signup-email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('signup-password') as HTMLInputElement).value;
    const name = (form.elements.namedItem('signup-name') as HTMLInputElement).value;
    const userType = (form.elements.namedItem('user-type') as HTMLSelectElement).value;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          full_name: name,
          user_type: userType,
        }
      }
    });
    
    if (error) {
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive",
      });
      setIsLoading(false);
    } else {
      toast({
        title: "Account created!",
        description: "Welcome to WasteLess ServeMore. Let's make an impact!",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 mb-8 text-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to home</span>
        </Link>

        <Card className="shadow-medium">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 rounded-lg gradient-hero flex items-center justify-center shadow-medium mb-4">
              <Heart className="w-6 h-6 text-white" fill="currentColor" />
            </div>
            <CardTitle className="text-2xl">Welcome to WasteLess ServeMore</CardTitle>
            <CardDescription>Sign in or create an account to start making impact</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input 
                      id="signin-email" 
                      name="sign-in-email"
                      type="email" 
                      placeholder="you@example.com" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input 
                      id="signin-password" 
                      type="password" 
                      placeholder="••••••••" 
                      name="sign-in-password"
                      required 
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full gradient-hero text-white" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input 
                      id="signup-name" 
                      type="text" 
                      placeholder="Your name" 
                      name="signup-name"
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input 
                      id="signup-email" 
                      type="email" 
                      placeholder="you@example.com" 
                      name="signup-email"
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input 
                      id="signup-password" 
                      type="password" 
                      name="signup-password"
                      placeholder="••••••••" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-type">I am a</Label>
                    <select 
                      id="user-type" 
                      className="w-full h-10 px-3 rounded-md border border-input bg-background"
                      required
                    >
                      <option value="">Select...</option>
                      <option value="donor">Donor (Individual/Restaurant/Caterer)</option>
                      <option value="ngo">NGO/Shelter/Food Bank</option>
                    </select>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full gradient-hero text-white" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
