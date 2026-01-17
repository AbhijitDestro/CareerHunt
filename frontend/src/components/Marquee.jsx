import { SiGoogle, SiAmazon, SiNetflix, SiUber, SiAirbnb, SiSpotify, SiAdobe } from 'react-icons/si';
import { FaMicrosoft } from 'react-icons/fa';

const companies = [
  { name: 'Google', icon: SiGoogle },
  { name: 'Amazon', icon: SiAmazon },
  { name: 'Microsoft', icon: FaMicrosoft },
  { name: 'Netflix', icon: SiNetflix },
  { name: 'Uber', icon: SiUber },
  { name: 'Airbnb', icon: SiAirbnb },
  { name: 'Spotify', icon: SiSpotify },
  { name: 'Adobe', icon: SiAdobe },
];

const Marquee = () => {
  return (
    <div className="w-full bg-[#0d0d12] py-12 overflow-hidden border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
        <p className="text-gray-400 text-sm font-semibold tracking-widest uppercase">Trusted by leading companies</p>
      </div>
      
      <div className="relative flex overflow-x-hidden group">
        <div className="py-2 animate-marquee whitespace-nowrap flex items-center gap-16 pr-16">
          {companies.map((Company, idx) => (
            <div key={idx} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors duration-300 cursor-pointer">
              <Company.icon className="text-3xl" />
              <span className="text-xl font-bold">{Company.name}</span>
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {companies.map((Company, idx) => (
            <div key={`dup-${idx}`} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors duration-300 cursor-pointer">
              <Company.icon className="text-3xl" />
              <span className="text-xl font-bold">{Company.name}</span>
            </div>
          ))}
           {companies.map((Company, idx) => (
            <div key={`dup2-${idx}`} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors duration-300 cursor-pointer">
              <Company.icon className="text-3xl" />
              <span className="text-xl font-bold">{Company.name}</span>
            </div>
          ))}
        </div>
        
        {/* Gradients for fade effect */}
        <div className="absolute top-0 left-0 w-32 h-full bg-linear-to-r from-[#0d0d12] to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-linear-to-l from-[#0d0d12] to-transparent z-10"></div>
      </div>
    </div>
  );
};

export default Marquee;
