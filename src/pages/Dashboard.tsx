import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Heart, Package, Users, TrendingUp, Clock, MapPin } from "lucide-react";

const Dashboard = () => {
  // Mock data - will be replaced with real data from backend
  const stats = {
    mealsSaved: 127,
    activeDonations: 3,
    co2Reduced: "45kg",
    impactScore: 89,
  };

  const recentDonations = [
    {
      id: 1,
      foodType: "Fresh vegetables & fruits",
      quantity: 25,
      status: "Picked up",
      date: "2025-01-08",
      location: "Mumbai Central",
    },
    {
      id: 2,
      foodType: "Cooked rice & curry",
      quantity: 50,
      status: "Pending",
      date: "2025-01-07",
      location: "Andheri West",
    },
    {
      id: 3,
      foodType: "Packed meals",
      quantity: 30,
      status: "Delivered",
      date: "2025-01-06",
      location: "Bandra",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-secondary text-secondary-foreground";
      case "Picked up":
        return "bg-accent text-accent-foreground";
      case "Pending":
        return "bg-primary/20 text-primary";
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
                  <div className="space-y-4">
                    {recentDonations.map((donation) => (
                      <div
                        key={donation.id}
                        className="flex items-start justify-between p-4 border border-border rounded-lg hover:shadow-soft transition-shadow"
                      >
                        <div className="flex-1">
                          <div className="flex items-start gap-3">
                            <Package className="w-5 h-5 text-primary mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-foreground">{donation.foodType}</h4>
                              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  {donation.quantity} servings
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {donation.location}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {donation.date}
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
                </TabsContent>
                
                <TabsContent value="requests" className="mt-6">
                  <div className="text-center py-12 text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No food requests at the moment</p>
                    <p className="text-sm mt-1">Check back later for new opportunities to help</p>
                  </div>
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
