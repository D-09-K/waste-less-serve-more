import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, MapPin, Clock, Package } from "lucide-react";

const Donate = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Placeholder for donation submission logic
    setTimeout(() => {
      toast({
        title: "Donation listed successfully!",
        description: "NGOs in your area will be notified. Thank you for making a difference!",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Donate <span className="text-gradient">Food</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                List your surplus food and help feed those in need
              </p>
            </div>

            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Food Donation Details</CardTitle>
                <CardDescription>Fill in the details about the food you want to donate</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="food-type">Food Type</Label>
                    <Input 
                      id="food-type" 
                      placeholder="e.g., Cooked rice, Fresh vegetables, Packed meals" 
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity (servings)</Label>
                    <div className="relative">
                      <Package className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="quantity" 
                        type="number" 
                        className="pl-10"
                        placeholder="Number of people this can feed" 
                        required 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pickup-location">Pickup Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="pickup-location" 
                        className="pl-10"
                        placeholder="Full address for pickup" 
                        required 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expiry">Best Before (Date & Time)</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="expiry" 
                        type="datetime-local" 
                        className="pl-10"
                        required 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Additional Details</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Any special instructions, dietary information, or storage requirements..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Food Image (Optional)</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-1">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
                      <Input 
                        id="image" 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full gradient-hero text-white text-lg py-6" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Listing Food..." : "List Food for Donation"}
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

export default Donate;
