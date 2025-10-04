import aprovaLogo from "@/assets/aprova-logo.png";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="relative w-32 h-32">
        {/* Teal circular background with animated tracing */}
        <div className="absolute inset-0 rounded-full bg-primary animate-pulse" />
        <div className="absolute inset-0 rounded-full border-4 border-primary-glow animate-spin" 
             style={{ borderTopColor: 'transparent' }} />
        
        {/* Logo with fade animation */}
        <div className="absolute inset-0 flex items-center justify-center animate-fade-in">
          <img 
            src={aprovaLogo} 
            alt="APROVA Logo" 
            className="w-20 h-20 object-contain filter brightness-0 invert"
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
