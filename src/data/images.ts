/**
 * LIVI DEVELOPERS - Image path mapping and currency formatting utilities
 */

export const PROPERTY_IMAGES: Record<string, string[]> = {
  'glass-residence': [
    '/images/properties/glass-residence-1.webp',
    '/images/properties/glass-residence-2.webp',
    '/images/properties/glass-residence-3.webp',
  ],
  'aurora-villa': [
    '/images/properties/aurora-villa-1.webp',
    '/images/properties/aurora-villa-2.webp',
    '/images/properties/aurora-villa-3.webp',
  ],
  'noor-heights': [
    '/images/properties/noor-heights-1.webp',
    '/images/properties/noor-heights-2.webp',
    '/images/properties/noor-heights-3.webp',
  ],
  'marble-court': [
    '/images/properties/marble-court-1.webp',
    '/images/properties/marble-court-2.webp',
    '/images/properties/marble-court-3.webp',
  ],
  'garden-estate': [
    '/images/properties/garden-estate-1.webp',
    '/images/properties/garden-estate-2.webp',
    '/images/properties/garden-estate-3.webp',
  ],
  'skyline-penthouse': [
    '/images/properties/skyline-penthouse-1.webp',
    '/images/properties/skyline-penthouse-2.webp',
    '/images/properties/skyline-penthouse-3.webp',
  ],
  'pearl-plot': [
    '/images/properties/pearl-plot-1.webp',
    '/images/properties/pearl-plot-2.webp',
    '/images/properties/pearl-plot-3.webp',
  ],
  'canal-view-house': [
    '/images/properties/canal-view-house-1.webp',
    '/images/properties/canal-view-house-2.webp',
    '/images/properties/canal-view-house-3.webp',
  ],
};

export const SERVICE_IMAGES = {
  propertyShowcase: '/images/services/property-showcase.webp',
  sitePlanning: '/images/services/site-planning.webp',
  buildingDesign: '/images/services/building-design.webp',
  spacePlanning: '/images/services/space-planning.webp',
};

/**
 * Format Pakistani Rupee numerical values into standard Crore / Lakh representations.
 * e.g., 25000000 -> "PKR 2.5 Crore", 8500000 -> "PKR 85 Lakh"
 */
export function formatPkr(amount: number): string {
  if (amount >= 10000000) {
    const crore = amount / 10000000;
    // Format to max 2 decimals, trim trailing zeros
    const formatted = parseFloat(crore.toFixed(2));
    return `PKR ${formatted} Crore`;
  }
  if (amount >= 100000) {
    const lakh = amount / 100000;
    const formatted = parseFloat(lakh.toFixed(2));
    return `PKR ${formatted} Lakh`;
  }
  return `PKR ${amount.toLocaleString('en-PK')}`;
}
