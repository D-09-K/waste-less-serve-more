import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-20 gradient-hero relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">Join 500+ Active Donors</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Every donation counts. Start your journey towards zero food waste today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 shadow-strong text-lg px-8 py-6"
            >
              <Link to="/auth">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            
            <Button 
              asChild
              variant="outline" 
              size="lg"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6"
            >
              <Link to="/donate">
                Donate Now
              </Link>
            </Button>
          </div>

          <p className="mt-6 text-sm text-white/70">
            No credit card required • Free forever • Make impact immediately
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
