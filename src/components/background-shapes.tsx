export default function BackgroundShapes() {
    return (
      <>
        {/* Top left circle */}
        <div className="absolute top-10 right-10 w-30 h-30 bg-black rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '1s' }}></div>
        
        {/* Top right circle */}
        <div className="absolute top-12 left-32 w-24 h-24 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '1s' }}></div>
        
        {/* Bottom left circle */}
        <div className="absolute bottom-0  w-32 h-32 bg-red-700 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '1s' }}></div>
        
        {/* Large right circle */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-bg-[#070707FF] rounded-full transform translate-x-20 -translate-y-20 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '1s' }}></div>
        
        {/* Bottom right shape */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-emerald-200 to-transparent rounded-full opacity-30 transform translate-x-32 translate-y-32 animate-bounce" style={{ animationDelay: '0.8s', animationDuration: '1s' }}></div>
      </>
    )
  }