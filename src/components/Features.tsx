import { Heart, Users, TrendingUp, Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Heart,
    title: "Easy Donations",
    description: "List surplus food in minutes. Connect with NGOs who need it most.",
    color: "text-primary",
  },
  {
    icon: Users,
    title: "Verified NGOs",
    description: "Partner with trusted organizations ensuring food reaches those in need.",
    color: "text-secondary",
  },
  {
    icon: TrendingUp,
    title: "Track Impact",
    description: "See your contribution in real-time. Meals saved, CO2 reduced, lives touched.",
    color: "text-accent",
  },
  {
    icon: Bell,
    title: "Smart Matching",
    description: "Automated alerts connect donors with nearby requests instantly.",
    color: "text-primary",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How <span className="text-gradient">It Works</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple steps to make a meaningful impact. Join thousands making a difference.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-border hover:shadow-medium transition-all duration-300 hover:-translate-y-1 animate-slide-up bg-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="pt-6">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-${feature.color.replace('text-', '')}/20 to-${feature.color.replace('text-', '')}/10 flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
