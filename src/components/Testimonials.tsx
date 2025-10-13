import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Restaurant Owner",
    content: "WasteLess ServeMore helped us reduce waste by 70%. Now our surplus food helps feed 50+ people daily.",
    avatar: "👨‍🍳",
  },
  {
    name: "Priya Sharma",
    role: "NGO Director",
    content: "The platform connects us with fresh food donations instantly. It's transformed how we serve our community.",
    avatar: "👩‍💼",
  },
  {
    name: "Amit Patel",
    role: "Event Organizer",
    content: "After events, we donate leftover food within minutes. No waste, just impact. Absolutely brilliant!",
    avatar: "👨‍💻",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Stories of <span className="text-gradient">Impact</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real people making real change. Join our community of changemakers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="border-border hover:shadow-medium transition-all duration-300 animate-slide-up bg-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="pt-6">
                <Quote className="w-8 h-8 text-primary mb-4" />
                <p className="text-foreground mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <div className="font-bold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
