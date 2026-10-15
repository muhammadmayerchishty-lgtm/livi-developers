/**
 * LIVI DEVELOPERS - Strongly typed properties data layer
 */

export type PropertyPurpose = 'buy' | 'rent';
export type PropertyType = 'house' | 'apartment' | 'plot' | 'villa';

export interface FloorPlanItem {
  label: string;
  areaM2: number;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  purpose: PropertyPurpose;
  type: PropertyType;
  area: string;
  pricePkr: number;
  sizeLabel: string;
  sizeSqft: number;
  bedrooms: number;
  bathrooms: number;
  features: string[];
  description: string;
  agentName: string;
  images: string[];
  floorPlan: FloorPlanItem[];
  featured: boolean;
}

export const PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    slug: 'glass-residence',
    title: 'Glass Residence',
    purpose: 'buy',
    type: 'villa',
    area: 'DHA Phase 6, Lahore',
    pricePkr: 345000000, // 34.5 Crore
    sizeLabel: '2 Kanal',
    sizeSqft: 9000,
    bedrooms: 6,
    bathrooms: 7,
    featured: true,
    agentName: 'Zainab Malik',
    images: [
      '/images/properties/glass-residence-1.webp',
      '/images/properties/glass-residence-2.webp',
      '/images/properties/glass-residence-3.webp',
    ],
    features: [
      '28ft Cantilevered Master Wing',
      'Double-Height Structural Curtain Glass',
      '40ft Heated Infinity Pool & Sunken Fire Pit',
      'Imported Calacatta Marble & Teak Millwork',
      'Integrated Control4 Smart System & 25kW Solar',
      'Underground 4-Car Showroom Garage',
    ],
    description:
      'A tour-de-force of contemporary brutalist architecture located in DHA Phase 6. Featuring floor-to-ceiling thermally broken German glazing, an expansive reflection pool, and an open-concept living pavilion illuminated by warm concealed architectural LEDs.',
    floorPlan: [
      { label: 'Ground Floor Pavilion & Lounge', areaM2: 380 },
      { label: 'Cantilever Master Level & Terraces', areaM2: 320 },
      { label: 'Basement Cinema & Wellness Spa', areaM2: 180 },
    ],
  },
  {
    id: 'prop-2',
    slug: 'aurora-villa',
    title: 'Aurora Villa',
    purpose: 'buy',
    type: 'villa',
    area: 'Defence Raya Golf Club, DHA Phase 6',
    pricePkr: 280000000, // 28 Crore
    sizeLabel: '1 Kanal',
    sizeSqft: 4500,
    bedrooms: 5,
    bathrooms: 6,
    featured: true,
    agentName: 'Hamza Chishti',
    images: [
      '/images/properties/aurora-villa-1.webp',
      '/images/properties/aurora-villa-2.webp',
      '/images/properties/aurora-villa-3.webp',
    ],
    features: [
      'Direct Championship Fairway Panoramic Views',
      'Floating Travertine Stepping Stones Over Water',
      'Central Basalt Zen Courtyard with Century Olive',
      'Boffi Gourmet Chef Kitchen with Miele Built-ins',
      'Triple-Pane Acoustic Glazing & VRF HVAC',
      'Private Rooftop Sundeck & Putting Green',
    ],
    description:
      'Perched directly on the rolling fairways of Defence Raya. Designed around an architectural reflection water spine, offering peaceful seclusion and dramatic twilight entertaining spaces framed by vertical bronze louvers.',
    floorPlan: [
      { label: 'Main Level Living & Dining', areaM2: 240 },
      { label: 'Upper Family Suites & Balconies', areaM2: 210 },
      { label: 'Rooftop Golf Lounge Deck', areaM2: 85 },
    ],
  },
  {
    id: 'prop-3',
    slug: 'noor-heights',
    title: 'Noor Heights',
    purpose: 'buy',
    type: 'apartment',
    area: 'Gulberg III, MM Alam Enclave',
    pricePkr: 185000000, // 18.5 Crore
    sizeLabel: '5,200 sq.ft',
    sizeSqft: 5200,
    bedrooms: 4,
    bathrooms: 5,
    featured: true,
    agentName: 'Ayesha Rahman',
    images: [
      '/images/properties/noor-heights-1.webp',
      '/images/properties/noor-heights-2.webp',
      '/images/properties/noor-heights-3.webp',
    ],
    features: [
      'Direct High-Speed Private Elevator Foyer',
      'Full-Floor Footprint with 360° Skyline Views',
      'Integrated Dornbracht Spa Master Bathrooms',
      'Italian Fluted Oak & Leather Wall Cladding',
      'Valet Concierge & 3 Underground Parking Bays',
      'Resident-Only Heated Sky Pool & Wellness Club',
    ],
    description:
      'A full-floor private sky sanctuary above the heart of Gulberg III. Featuring uninterrupted views across Lahore, museum-calibrated ambient lighting, and generous entertaining salons with seamless terrace transitions.',
    floorPlan: [
      { label: 'Sky Salon & Dining Gallery', areaM2: 260 },
      { label: 'Private Bedroom Suites Wing', areaM2: 190 },
      { label: 'Wraparound Sunset Terrace', areaM2: 70 },
    ],
  },
  {
    id: 'prop-4',
    slug: 'marble-court',
    title: 'Marble Court',
    purpose: 'buy',
    type: 'house',
    area: 'DHA Phase 8, Lahore',
    pricePkr: 220000000, // 22 Crore
    sizeLabel: '1 Kanal',
    sizeSqft: 5000,
    bedrooms: 5,
    bathrooms: 6,
    featured: true,
    agentName: 'Tariq Javed',
    images: [
      '/images/properties/marble-court-1.webp',
      '/images/properties/marble-court-2.webp',
      '/images/properties/marble-court-3.webp',
    ],
    features: [
      'Hand-Ribbed Portuguese Limestone Exterior',
      'Concealed Architectural Cove Lighting Lines',
      'Heated Plunge Pool with Basalt Water Blade',
      'Custom Wine & Cigar Tasting Lounge',
      'Whole-Home High-Capacity Lithium Microgrid',
      'Automated Motorized Privacy Louvers',
    ],
    description:
      'Imposing geometric symmetry softened by hand-carved natural stone textures. Marble Court stands as a statement of enduring luxury in DHA Phase 8 with seamless transition between internal halls and serene outdoor courtyards.',
    floorPlan: [
      { label: 'Ground Floor Formal Courtyard', areaM2: 250 },
      { label: 'First Floor Master Suites', areaM2: 215 },
    ],
  },
  {
    id: 'prop-5',
    slug: 'garden-estate',
    title: 'Garden Estate',
    purpose: 'buy',
    type: 'villa',
    area: 'Bahria Town, Sector C, Lahore',
    pricePkr: 165000000, // 16.5 Crore
    sizeLabel: '2 Kanal',
    sizeSqft: 8500,
    bedrooms: 6,
    bathrooms: 7,
    featured: false,
    agentName: 'Zainab Malik',
    images: [
      '/images/properties/garden-estate-1.webp',
      '/images/properties/garden-estate-2.webp',
      '/images/properties/garden-estate-3.webp',
    ],
    features: [
      'Expansive 1 Kanal Sculptural Garden & Pool',
      'Double-Story Glass Atrium with Living Green Wall',
      'Separate In-Law Suite & Staff Quarters',
      'Gourmet Island Kitchen with Butler Pantry',
      'Private Gym & Himalayan Salt Sauna',
      'Underground Rainwater Harvesting & Filtration',
    ],
    description:
      'A biophilic private estate set in Bahria Town. Enveloped by lush landscaped palms, private water fountains, and floor-to-ceiling glass pavilions that invite natural daylight while maintaining complete family privacy.',
    floorPlan: [
      { label: 'Garden Pavilion & Reception', areaM2: 360 },
      { label: 'Upper Bedroom Quarters & Terrace', areaM2: 310 },
      { label: 'Spa & Wellness Pavilion', areaM2: 120 },
    ],
  },
  {
    id: 'prop-6',
    slug: 'skyline-penthouse',
    title: 'Skyline Penthouse',
    purpose: 'rent',
    type: 'apartment',
    area: 'Gulberg II, Main Boulevard, Lahore',
    pricePkr: 1800000, // 18 Lakh/month
    sizeLabel: '4,000 sq.ft',
    sizeSqft: 4000,
    bedrooms: 3,
    bathrooms: 4,
    featured: true,
    agentName: 'Ayesha Rahman',
    images: [
      '/images/properties/skyline-penthouse-1.webp',
      '/images/properties/skyline-penthouse-2.webp',
      '/images/properties/skyline-penthouse-3.webp',
    ],
    features: [
      'Fully Furnished by Italian Design House',
      'Panoramic 180-Degree Sunset Balcony',
      'Sub-Zero Refrigeration & Wine Cooler',
      'Automated Blackout & Sheer Blinds',
      '2 Dedicated Basement Parking Spaces',
      '24/7 Security & Keycard Lift Access',
    ],
    description:
      'Available for discerning corporate and diplomatic leases. An impeccably furnished duplex penthouse offering panoramic skyline views, high ceilings, custom brass finishes, and bespoke Italian furnishings.',
    floorPlan: [
      { label: 'Lower Level Living & Kitchen', areaM2: 190 },
      { label: 'Upper Master & Guest Suites', areaM2: 180 },
    ],
  },
  {
    id: 'prop-7',
    slug: 'pearl-plot',
    title: 'Pearl Plot',
    purpose: 'buy',
    type: 'plot',
    area: 'DHA Phase 9 Prism, Block D, Lahore',
    pricePkr: 85000000, // 8.5 Crore
    sizeLabel: '2 Kanal',
    sizeSqft: 9000,
    bedrooms: 0,
    bathrooms: 0,
    featured: false,
    agentName: 'Hamza Chishti',
    images: [
      '/images/properties/pearl-plot-1.webp',
      '/images/properties/pearl-plot-2.webp',
      '/images/properties/pearl-plot-3.webp',
    ],
    features: [
      '100% Clear DHA Title & Immediate Allocation',
      'Corner Plot Facing 120ft Main Boulevard',
      'Adjacent to 40-Kanal Community Central Park',
      'Underground Electrical & Fiber Infrastructure',
      'Approved Architectural Footprint by DHA Authorities',
      'High Capital Appreciation Corridor',
    ],
    description:
      'A rare prime 2-Kanal corner residential parcel in DHA Phase 9 Prism. Perfectly positioned on a wide boulevard with optimal cardinal orientation for custom modern architectural construction.',
    floorPlan: [
      { label: 'Maximum Ground Footprint (65%)', areaM2: 540 },
      { label: 'Upper Living Expansion Area', areaM2: 500 },
    ],
  },
  {
    id: 'prop-8',
    slug: 'canal-view-house',
    title: 'Canal View House',
    purpose: 'buy',
    type: 'house',
    area: 'Canal Bank Enclave, Johar Town, Lahore',
    pricePkr: 145000000, // 14.5 Crore
    sizeLabel: '1 Kanal',
    sizeSqft: 4500,
    bedrooms: 5,
    bathrooms: 5,
    featured: true,
    agentName: 'Tariq Javed',
    images: [
      '/images/properties/canal-view-house-1.webp',
      '/images/properties/canal-view-house-2.webp',
      '/images/properties/canal-view-house-3.webp',
    ],
    features: [
      'Tranquil Waterfront Canal Green Belt Views',
      'Modern Cantilever Concrete Balconies',
      'Rooftop BBQ Patio & Sunken Lounge',
      'Designer Spanish Porcelain Tile Flooring',
      'Complete Smart CCTV Security Mesh',
      'Double Car Porch with EV Charger',
    ],
    description:
      'Serene waterfront living in Johar Town. Combining rapid access to Emporium Mall and canal expressways with a peaceful residential enclave featuring private gardens and generous open-plan living spaces.',
    floorPlan: [
      { label: 'Ground Floor Lounge & Guest Room', areaM2: 220 },
      { label: 'Upper Level Family Suites & Terrace', areaM2: 200 },
    ],
  },
];
