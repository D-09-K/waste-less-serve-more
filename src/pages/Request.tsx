import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Users, MapPin, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Request = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to submit a food request.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        navigate("/auth");
        return;
      }

      const formData = new FormData(e.currentTarget);

      const { error: insertError } = await supabase.from('requests').insert({
        user_id: user.id,
        organization_name: formData.get('organization') as string,
        people_count: parseInt(formData.get('people-count') as string),
        location: formData.get('location') as string,
        needed_by: formData.get('needed-by') as string,
        urgency: formData.get('urgency') as string,
        preferences: formData.get('preferences') as string || null,
        contact: formData.get('contact') as string,
        status: 'pending',
      });

      if (insertError) {
        throw insertError;
      }

      toast({
        title: "Request submitted successfully!",
        description: "We'll notify nearby donors. You'll hear from us soon!",
      });

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error submitting request",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Request <span className="text-gradient">Food</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Let donors know your needs and get connected with available food
              </p>
            </div>

            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Food Request Details</CardTitle>
                <CardDescription>Tell us about your food requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization Name</Label>
                    <Input 
                      id="organization" 
                      placeholder="Your NGO/Shelter name" 
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="people-count">Number of People to Feed</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="people-count" 
                        type="number" 
                        className="pl-10"
                        placeholder="How many people need food?" 
                        required 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Delivery Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="location" 
                        className="pl-10"
                        placeholder="Full address for delivery" 
                        required 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="needed-by">Food Needed By</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="needed-by" 
                        type="datetime-local" 
                        className="pl-10"
                        required 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="urgency">Request Urgency</Label>
                    <select 
                      id="urgency" 
                      className="w-full h-10 px-3 rounded-md border border-input bg-background"
                      required
                    >
                      <option value="">Select urgency level...</option>
                      <option value="low">Low - Within a week</option>
                      <option value="medium">Medium - Within 2-3 days</option>
                      <option value="high">High - Within 24 hours</option>
                      <option value="urgent">Urgent - Immediate need</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preferences">Food Preferences/Restrictions</Label>
                    <Textarea 
                      id="preferences" 
                      placeholder="Any dietary requirements, preferences, or restrictions..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact">Contact Person & Phone</Label>
                    <Input 
                      id="contact" 
                      type="tel"
                      placeholder="+91 9876543210" 
                      required 
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full gradient-secondary text-white text-lg py-6" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting Request..." : "Submit Food Request"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Request;
