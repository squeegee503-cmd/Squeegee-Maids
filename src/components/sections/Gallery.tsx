import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";

import Gallery011 from "@/assets/Gallery_011.png";
import Gallery012 from "@/assets/Gallery_012.png";
import Gallery014 from "@/assets/Gallery_014.png";
import Gallery015 from "@/assets/Gallery_015.png";
import Gallery016 from "@/assets/Gallery_016.png";
import Gallery017 from "@/assets/Gallery_017.png";
import Gallery018 from "@/assets/Gallery_018.png";
import Gallery019 from "@/assets/Gallery_019.png";
import Gallery020 from "@/assets/Gallery_019.png";

type GalleryItem = {
  src: string;
  alt: string;
  tag: string;
};
const galleryItems: GalleryItem[] = [
  { src: Gallery011, alt: "Professional Cleaning", tag: "House Cleaning" },
  { src: Gallery012, alt: "Kitchen Cleaning", tag: "Expert Cleaners" },
  { src: Gallery014, alt: "Living Room", tag: "Move Out Cleaning" },
  { src: Gallery015, alt: "Bedroom Cleaning", tag: "Move Out Cleaning" },
  { src: Gallery016, alt: "Move Out Cleaning", tag: "Recurring Cleaning" },
  { src: Gallery017, alt: "Deep Cleaning", tag: "Friendly Staff" },
  { src: Gallery018, alt: "Office Cleaning", tag: " Standard Cleaning" },
  { src: Gallery019, alt: "Eco-Friendly Products", tag: "Deep Kitchen Cleaning" },
    { src: Gallery020, alt: "Eco-Friendly Products", tag: "Deep Kitchen Cleaning" },
];


const colSpans = [
  "sm:col-span-2 sm:row-span-2",
  "",
  "",
  "sm:col-span-2",
  "",
  "",
  "sm:col-span-2 sm:row-span-2",
  "",
  "",
];

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + galleryItems.length) % galleryItems.length,
    );
  const nextImage = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % galleryItems.length));

  return (
    <section id="gallery" className="bg-[#f1f5f980] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-black text-sm font-bold uppercase tracking-widest mb-3">
            <Camera size={16} />
            Our Work
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight mb-3">
            The Gallery
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            A look at some of our recent cleaning projects.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 auto-rows-[180px] sm:auto-rows-[200px] gap-3 sm:gap-4">
          {galleryItems.map((item, index) => (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className={`group relative overflow-hidden rounded-xl shadow-md ${colSpans[index] ?? ""} cursor-zoom-in`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="inline-block bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                  {item.tag}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button onClick={closeLightbox} className="absolute top-4 right-4 text-white p-2">
            <X size={30} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 text-white p-2"
          >
            <ChevronLeft size={40} />
          </button>
          <figure
            onClick={(e) => e.stopPropagation()}
            className="max-w-5xl w-full"
          >
            <img
              src={galleryItems[lightboxIndex].src}
              alt={galleryItems[lightboxIndex].alt}
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />
            <figcaption className="text-center text-white mt-4">
              <span className="inline-block bg-primary px-3 py-1 rounded-full text-xs font-bold mr-2">
                {galleryItems[lightboxIndex].tag}
              </span>
              <span className="text-sm text-white/70">
                {galleryItems[lightboxIndex].alt} • {lightboxIndex + 1} / {galleryItems.length}
              </span>
            </figcaption>
          </figure>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 text-white p-2"
          >
            <ChevronRight size={40} />
          </button>
        </div>
      )}
    </section>
  );
}
