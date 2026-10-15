import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SafeImage } from './SafeImage';
import { Maximize2, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  location: string;
  src: string;
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Twilight Cantilever Villa',
    category: 'Architecture & Facade',
    location: 'Sector K, DHA Phase 6',
    src: '/images/hero-home.webp',
    description: 'Dusk view of the monolithic glass pavilion with reflective infinity pool and illuminated palm borders.',
  },
  {
    id: 'g-2',
    title: 'Cantilever Terrace & Sunken Fire Lounge',
    category: 'Exterior Living',
    location: 'Defence Raya, Lahore',
    src: '/images/villa-cantilever.webp',
    description: 'Travertine paved terrace with warm linear LED accent channels and a sunken fire pit surrounded by water.',
  },
  {
    id: 'g-3',
    title: 'Double-Height Calacatta Marble Gallery',
    category: 'Interior Architecture',
    location: 'MM Alam Road, Gulberg III',
    src: '/images/interior-penthouse.webp',
    description: 'Massive bookmatched marble feature wall with custom brass lighting fixtures and panoramic Lahore skyline views.',
  },
  {
    id: 'g-4',
    title: 'Basalt Water Spine Courtyard',
    category: 'Biophilic Landscape',
    location: 'Model Town Enclave',
    src: '/images/courtyard-water.webp',
    description: 'Linear architectural water channel reflecting fluted concrete walls and sculptural centuries-old olive trees.',
  },
  {
    id: 'g-5',
    title: 'Hand-Cut Limestone & Bronze Mullions',
    category: 'Craftsmanship & Materials',
    location: 'DHA Phase 8 Signature Estate',
    src: '/images/facade-detail.webp',
    description: 'Tactile juxtaposition between dark fluted bronze panels and vertical ribbed Portuguese limestone.',
  },
];

export const Gallery: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % GALLERY_ITEMS.length);
  };

  const prevPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex(
      (selectedPhotoIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
    );
  };

  return (
    <section id="gallery" className="py-28 bg-[#0E1214] text-[#F2EFE9] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-syne font-semibold tracking-[0.3em] uppercase text-[#C9A66B] mb-2">
              <span>VISUAL DOSSIER</span>
              <span aria-hidden="true">·</span>
              <span>PHOTOGRAPHY ARCHIVE</span>
            </div>
            <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl tracking-wide uppercase text-[#F2EFE9]">
              ARCHITECTURAL GALLERY
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-syne tracking-wider text-[#9AA3A8]">
            <Camera className="w-4 h-4 text-[#C9A66B]" />
            <span>CLICK ANY FRAME FOR EXPANDED HIGH-RES VIEW</span>
          </div>
        </div>

        {/* Gallery Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Hero Shot (Col 7) */}
          <div
            onClick={() => openLightbox(0)}
            className="md:col-span-7 group relative aspect-[16/10] bg-[#161C1F] rounded-sm overflow-hidden border border-white/10 hover:border-[#C9A66B]/50 transition-all cursor-pointer"
          >
            <SafeImage
              src={GALLERY_ITEMS[0].src}
              alt={GALLERY_ITEMS[0].title}
              width={1000}
              height={625}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.88] group-hover:brightness-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E1214] via-transparent to-transparent opacity-90" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <span className="text-[10px] font-syne tracking-widest uppercase text-[#C9A66B] block mb-1">
                  {GALLERY_ITEMS[0].category} · {GALLERY_ITEMS[0].location}
                </span>
                <h3 className="font-syne font-bold text-xl sm:text-2xl text-[#F2EFE9]">
                  {GALLERY_ITEMS[0].title}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#161C1F]/80 border border-white/20 flex items-center justify-center text-[#F2EFE9] group-hover:bg-[#C9A66B] group-hover:text-[#0E1214] transition-colors">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Secondary Shot (Col 5) */}
          <div
            onClick={() => openLightbox(1)}
            className="md:col-span-5 group relative aspect-[16/10] md:aspect-auto bg-[#161C1F] rounded-sm overflow-hidden border border-white/10 hover:border-[#C9A66B]/50 transition-all cursor-pointer"
          >
            <SafeImage
              src={GALLERY_ITEMS[1].src}
              alt={GALLERY_ITEMS[1].title}
              width={800}
              height={600}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.88] group-hover:brightness-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E1214] via-transparent to-transparent opacity-90" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <span className="text-[10px] font-syne tracking-widest uppercase text-[#C9A66B] block mb-1">
                  {GALLERY_ITEMS[1].category}
                </span>
                <h3 className="font-syne font-bold text-lg sm:text-xl text-[#F2EFE9]">
                  {GALLERY_ITEMS[1].title}
                </h3>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#161C1F]/80 border border-white/20 flex items-center justify-center text-[#F2EFE9] group-hover:bg-[#C9A66B] group-hover:text-[#0E1214] transition-colors">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Bottom 3 Columns */}
          {GALLERY_ITEMS.slice(2).map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx + 2)}
              className="md:col-span-4 group relative aspect-[4/3] bg-[#161C1F] rounded-sm overflow-hidden border border-white/10 hover:border-[#C9A66B]/50 transition-all cursor-pointer"
            >
              <SafeImage
                src={item.src}
                alt={item.title}
                width={600}
                height={450}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.88] group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1214] via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-syne tracking-widest uppercase text-[#C9A66B] block mb-0.5">
                    {item.category}
                  </span>
                  <h4 className="font-syne font-bold text-base text-[#F2EFE9]">
                    {item.title}
                  </h4>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#161C1F]/80 border border-white/20 flex items-center justify-center text-[#F2EFE9] group-hover:bg-[#C9A66B] group-hover:text-[#0E1214] transition-colors shrink-0">
                  <Maximize2 className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-8 backdrop-blur-lg">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-20 p-3 bg-white/10 hover:bg-white/20 text-[#F2EFE9] rounded-full transition-colors cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Photo */}
            <button
              onClick={prevPhoto}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 hover:bg-white/20 text-[#F2EFE9] rounded-full transition-colors cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Photo */}
            <button
              onClick={nextPhoto}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 hover:bg-white/20 text-[#F2EFE9] rounded-full transition-colors cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image & Details Container */}
            <div className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center">
              <div className="relative w-full max-h-[70vh] flex items-center justify-center">
                <SafeImage
                  src={GALLERY_ITEMS[selectedPhotoIndex].src}
                  alt={GALLERY_ITEMS[selectedPhotoIndex].title}
                  width={1400}
                  height={900}
                  className="max-w-full max-h-[70vh] object-contain rounded"
                />
              </div>

              <div className="mt-6 text-center max-w-2xl">
                <span className="text-xs font-syne tracking-[0.25em] uppercase text-[#C9A66B]">
                  {GALLERY_ITEMS[selectedPhotoIndex].category} · {GALLERY_ITEMS[selectedPhotoIndex].location}
                </span>
                <h3 className="font-syne font-bold text-xl sm:text-2xl text-[#F2EFE9] mt-1">
                  {GALLERY_ITEMS[selectedPhotoIndex].title}
                </h3>
                <p className="text-xs sm:text-sm text-[#9AA3A8] mt-2">
                  {GALLERY_ITEMS[selectedPhotoIndex].description}
                </p>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
