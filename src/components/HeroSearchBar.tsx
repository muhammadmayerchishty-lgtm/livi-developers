import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Home, DollarSign, ArrowRight } from 'lucide-react';

export const HeroSearchBar: React.FC = () => {
  const navigate = useNavigate();
  const [area, setArea] = useState('all');
  const [propertyType, setPropertyType] = useState('all');
  const [budget, setBudget] = useState('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (area !== 'all') params.set('area', area);
    if (propertyType !== 'all') params.set('type', propertyType);
    if (budget !== 'all') params.set('budget', budget);

    navigate(`/properties?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full max-w-4xl mx-auto bg-[#161C1F]/90 backdrop-blur-md border border-white/10 rounded-sm p-3 sm:p-4 shadow-2xl grid grid-cols-1 sm:grid-cols-4 gap-3 items-center"
    >
      {/* Area Selector */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#0E1214] border border-white/10 rounded-xs">
        <MapPin className="w-4 h-4 text-[#C9A66B] shrink-0" />
        <div className="flex-1 min-w-0">
          <label htmlFor="hero-area" className="block text-[9px] font-syne uppercase tracking-wider text-[#9AA3A8]">
            LOCATION
          </label>
          <select
            id="hero-area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full bg-transparent text-xs text-[#F2EFE9] focus:outline-none cursor-pointer truncate"
          >
            <option value="all" className="bg-[#161C1F]">All Lahore Locations</option>
            <option value="DHA Phase 6" className="bg-[#161C1F]">DHA Phase 6</option>
            <option value="DHA Phase 8" className="bg-[#161C1F]">DHA Phase 8</option>
            <option value="Defence Raya" className="bg-[#161C1F]">Defence Raya Golf</option>
            <option value="Gulberg" className="bg-[#161C1F]">Gulberg III & II</option>
            <option value="Bahria Town" className="bg-[#161C1F]">Bahria Town</option>
            <option value="Johar Town" className="bg-[#161C1F]">Johar Town</option>
            <option value="DHA Phase 9" className="bg-[#161C1F]">DHA Phase 9 Prism</option>
          </select>
        </div>
      </div>

      {/* Property Type Selector */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#0E1214] border border-white/10 rounded-xs">
        <Home className="w-4 h-4 text-[#C9A66B] shrink-0" />
        <div className="flex-1 min-w-0">
          <label htmlFor="hero-type" className="block text-[9px] font-syne uppercase tracking-wider text-[#9AA3A8]">
            PROPERTY TYPE
          </label>
          <select
            id="hero-type"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full bg-transparent text-xs text-[#F2EFE9] focus:outline-none cursor-pointer truncate"
          >
            <option value="all" className="bg-[#161C1F]">All Residence Types</option>
            <option value="villa" className="bg-[#161C1F]">Signature Villas</option>
            <option value="apartment" className="bg-[#161C1F]">Penthouses & Apts</option>
            <option value="house" className="bg-[#161C1F]">Modern Houses</option>
            <option value="plot" className="bg-[#161C1F]">Prime Plots</option>
          </select>
        </div>
      </div>

      {/* Budget Selector */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#0E1214] border border-white/10 rounded-xs">
        <DollarSign className="w-4 h-4 text-[#C9A66B] shrink-0" />
        <div className="flex-1 min-w-0">
          <label htmlFor="hero-budget" className="block text-[9px] font-syne uppercase tracking-wider text-[#9AA3A8]">
            MAX BUDGET
          </label>
          <select
            id="hero-budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full bg-transparent text-xs text-[#F2EFE9] focus:outline-none cursor-pointer truncate"
          >
            <option value="all" className="bg-[#161C1F]">Any Investment Budget</option>
            <option value="150000000" className="bg-[#161C1F]">Under PKR 15 Crore</option>
            <option value="250000000" className="bg-[#161C1F]">Under PKR 25 Crore</option>
            <option value="350000000" className="bg-[#161C1F]">Under PKR 35 Crore</option>
            <option value="500000000" className="bg-[#161C1F]">Under PKR 50 Crore</option>
          </select>
        </div>
      </div>

      {/* Action Button */}
      <button
        type="submit"
        className="w-full py-3.5 bg-[#C9A66B] hover:bg-[#D8B57B] text-[#0E1214] font-syne font-bold text-xs uppercase tracking-[0.2em] rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
      >
        <Search className="w-4 h-4" />
        <span>Search Properties</span>
      </button>
    </form>
  );
};
