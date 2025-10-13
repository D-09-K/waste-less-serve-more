import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-food-sharing.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-20 mx-auto">
        <div className="max-w-3xl mx-auto text-center text-white animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <Heart className="w-4 h-4 text-primary" fill="currentColor" />
            <span className="text-sm font-medium">Making Every Meal Count</span>
          </div>
          
          <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
            Reduce Food Waste,
            <span className="block mt-2 text-gradient">Feed the Needy</span>
          </h1>
          
          <p className="mb-8 text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Connect donors with NGOs and create real impact. Every donation saves meals and changes lives.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild
              size="lg" 
              className="gradient-hero text-white shadow-glow hover:opacity-90 transition-opacity text-lg px-8 py-6"
            >
              <Link to="/donate">
                Donate Food Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            
            <Button 
              asChild
              variant="outline" 
              size="lg"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-lg px-8 py-6"
            >
              <Link to="/request">
                Request Food
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center animate-slide-up">
              <div className="text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-sm text-white/80">Meals Saved</div>
            </div>
            <div className="text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl font-bold text-secondary mb-2">500+</div>
              <div className="text-sm text-white/80">Active Donors</div>
            </div>
            <div className="text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold text-accent mb-2">50+</div>
              <div className="text-sm text-white/80">NGOs Connected</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
