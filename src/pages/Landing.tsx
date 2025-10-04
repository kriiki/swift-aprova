import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import aprovaLogo from "@/assets/aprova-logo.png";

const Landing = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-primary/5 to-accent/10 px-4">
      <div className={`text-center space-y-8 transition-all duration-700 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Logo Circle */}
        <div className="flex justify-center">
          <div className="relative w-32 h-32 rounded-full bg-primary shadow-glow flex items-center justify-center group cursor-pointer transition-transform duration-300 hover:scale-110">
            <img 
              src={aprovaLogo} 
              alt="APROVA Logo" 
              className="w-20 h-20 object-contain filter brightness-0 invert"
            />
            <div className="absolute inset-0 rounded-full bg-primary-glow opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-7xl font-heading font-bold text-gradient-primary">
            APROVA
          </h1>
          <p className="text-xl text-muted-foreground font-medium tracking-wide">
            Automate. Approve. Accelerate.
          </p>
        </div>

        {/* Description */}
        <p className="text-lg text-foreground/80 max-w-md mx-auto">
          Streamline your expense management workflow with intelligent automation
          and seamless approvals.
        </p>

        {/* CTA Button */}
        <Button
          onClick={() => navigate("/auth")}
          size="lg"
          className="bg-gradient-primary hover:shadow-glow transition-all duration-300 group px-8 py-6 text-lg"
        >
          Get Started
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default Landing;
