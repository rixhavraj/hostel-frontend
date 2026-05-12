import { useState, useEffect } from "react";
import axios from "axios";
import { motion as M, AnimatePresence } from "framer-motion";
import { FiMaximize2, FiX } from "react-icons/fi";
import API_URL from "../api";

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/gallery`);
        setImages(res.data);
      } catch (err) {
        console.error("Error fetching gallery:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <div className="min-h-screen section-dark pt-32 pb-24 px-4 overflow-x-hidden relative">
      <div className="absolute inset-0 top-0 h-[800px] z-0 overflow-hidden pointer-events-none">
         <div className="orb orb-2" style={{ top: '10%', right: '-10%', opacity: 0.15 }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="text-center mb-16 flex flex-col items-center">
          <M.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <span className="section-label">Our Facilities</span>
            <h1 className="text-5xl font-black text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Hostel <span className="gradient-text">Lifestyle</span>
            </h1>
            <div className="divider mx-auto mt-6" />
          </M.div>
          <M.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-white/60 max-w-lg mx-auto text-lg"
          >
            Take a look at our facilities, events, and the vibrant life of our residents.
          </M.p>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="w-12 h-12 border-4 border-white/10 border-t-indigo-500 rounded-full animate-spin"></span>
          </div>
        ) : (
          <M.div
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            animate="show"
            className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
          >
            {images.map((img) => (
              <M.div
                key={img._id}
                variants={fadeUp}
                className="relative group overflow-hidden rounded-3xl glass shadow-xl cursor-pointer break-inside-avoid"
                onClick={() => setSelectedImg(img)}
              >
                <img
                  src={img.url}
                  alt={img.caption || "Gallery image"}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center backdrop-blur-sm">
                  <FiMaximize2 className="text-white text-3xl mb-3" />
                  {img.caption && (
                    <p className="text-white font-bold text-sm bg-black/40 px-4 py-1.5 rounded-full">{img.caption}</p>
                  )}
                </div>
              </M.div>
            ))}
          </M.div>
        )}

        {!loading && images.length === 0 && (
          <div className="text-center py-20 opacity-50">
            <p className="text-xl font-medium text-white/50">No photos shared yet.</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <M.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setSelectedImg(null)}
          >
            <button
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              onClick={() => setSelectedImg(null)}
            >
              <FiX size={24} />
            </button>
            <M.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-5xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImg.url}
                alt={selectedImg.caption}
                className="max-h-[85vh] w-auto rounded-2xl shadow-2xl"
              />
              {selectedImg.caption && (
                <p className="mt-6 text-white text-lg font-medium text-center bg-white/10 px-6 py-2 rounded-full backdrop-blur-md border border-white/10">
                  {selectedImg.caption}
                </p>
              )}
            </M.div>
          </M.div>
        )}
      </AnimatePresence>
    </div>
  );
}
