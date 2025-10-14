import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Heart, Package, Users, TrendingUp, Clock, MapPin, Calendar, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Donation {
  id: string;
  food_type: string;
  quantity: number;
  status: string;
  created_at: string;
  pickup_location: string;
}

interface Request {
  id: string;
  organization_name: string;
  people_count: number;
  location: string;
  needed_by: string;
  urgency: string;
  preferences: string | null;
  contact: string;
  status: string;
  created_at: string;
}

const Dashboard = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          navigate("/auth");
          return;
        }

        const [donationsResult, requestsResult] = await Promise.all([
          supabase
            .from('donations')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false }),
          supabase
            .from('requests')
            .select('*')
            .order('created_at', { ascending: false })
        ]);

        if (donationsResult.error) throw donationsResult.error;
        if (requestsResult.error) throw requestsResult.error;

        setDonations(donationsResult.data || []);
        setRequests(requestsResult.data || []);
      } catch (error: any) {
        toast({
          title: "Error loading data",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate, toast]);

  const stats = {
    mealsSaved: donations.reduce((acc, d) => acc + d.quantity, 0),
    activeDonations: donations.filter(d => d.status === 'active').length,
    co2Reduced: `${Math.round(donations.reduce((acc, d) => acc + d.quantity, 0) * 0.35)}kg`,
    impactScore: Math.min(89, donations.length * 10),
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-secondary text-secondary-foreground";
      case "picked up":
      case "completed":
        return "bg-accent text-accent-foreground";
      case "pending":
      case "active":
        return "bg-primary/20 text-primary";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "urgent":
        return "bg-red-500 text-white";
      case "high":
        return "bg-orange-500 text-white";
      case "medium":
        return "bg-yellow-500 text-white";
      case "low":
        return "bg-green-500 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold mb-2">Welcome back, Donor! 👋</h1>
            <p className="text-muted-foreground">Here's your impact overview</p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-medium animate-slide-up">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Meals Saved
                </CardTitle>
                <Heart className="w-4 h-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.mealsSaved}</div>
                <p className="text-xs text-muted-foreground mt-1">+12 this week</p>
              </CardContent>
            </Card>

            <Card className="shadow-medium animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active Donations
                </CardTitle>
                <Package className="w-4 h-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.activeDonations}</div>
                <p className="text-xs text-muted-foreground mt-1">Awaiting pickup</p>
              </CardContent>
            </Card>

            <Card className="shadow-medium animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  CO₂ Reduced
                </CardTitle>
                <TrendingUp className="w-4 h-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.co2Reduced}</div>
                <p className="text-xs text-muted-foreground mt-1">Environmental impact</p>
              </CardContent>
            </Card>

            <Card className="shadow-medium animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Impact Score
                </CardTitle>
                <Users className="w-4 h-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.impactScore}</div>
                <p className="text-xs text-muted-foreground mt-1">Top 10% donors</p>
              </CardContent>
            </Card>
          </div>

          {/* Activity Section */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Your Activity</CardTitle>
              <CardDescription>Track your donations and requests</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="donations" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="donations">My Donations</TabsTrigger>
                  <TabsTrigger value="requests">Food Requests</TabsTrigger>
                </TabsList>
                
                <TabsContent value="donations" className="mt-6">
                  {isLoading ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <p>Loading your donations...</p>
                    </div>
                  ) : donations.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No donations yet</p>
                      <p className="text-sm mt-1">Start making a difference by donating food!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {donations.map((donation) => (
                        <div
                          key={donation.id}
                          className="flex items-start justify-between p-4 border border-border rounded-lg hover:shadow-soft transition-shadow"
                        >
                          <div className="flex-1">
                            <div className="flex items-start gap-3">
                              <Package className="w-5 h-5 text-primary mt-0.5" />
                              <div>
                                <h4 className="font-semibold text-foreground">{donation.food_type}</h4>
                                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Users className="w-3 h-3" />
                                    {donation.quantity} servings
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {donation.pickup_location}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {new Date(donation.created_at).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <Badge className={getStatusColor(donation.status)}>
                            {donation.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="requests" className="mt-6">
                  {isLoading ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <p>Loading food requests...</p>
                    </div>
                  ) : requests.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No food requests at the moment</p>
                      <p className="text-sm mt-1">Check back later for new opportunities to help</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {requests.map((request) => (
                        <div
                          key={request.id}
                          className="flex items-start justify-between p-4 border border-border rounded-lg hover:shadow-soft transition-shadow"
                        >
                          <div className="flex-1">
                            <div className="flex items-start gap-3">
                              <Users className="w-5 h-5 text-primary mt-0.5" />
                              <div className="flex-1">
                                <h4 className="font-semibold text-foreground">{request.organization_name}</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Users className="w-3 h-3" />
                                    {request.people_count} people
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {request.location}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    Needed by: {new Date(request.needed_by).toLocaleString()}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {request.contact}
                                  </span>
                                </div>
                                {request.preferences && (
                                  <p className="mt-2 text-sm text-muted-foreground italic">
                                    {request.preferences}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 items-end ml-4">
                            <Badge className={getUrgencyColor(request.urgency)}>
                              {request.urgency}
                            </Badge>
                            <Badge className={getStatusColor(request.status)}>
                              {request.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
