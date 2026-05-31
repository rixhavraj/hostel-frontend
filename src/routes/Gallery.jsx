import { useState, useEffect } from "react";
import axios from "axios";
import { motion as M, AnimatePresence } from "framer-motion";
import { FiMaximize2, FiX } from "react-icons/fi";
import API_URL from "../api";

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
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header */}
      <section className="bg-white border-b border-gray-200 pt-16 pb-12 mb-12">
        <div className="container mx-auto text-center px-4">
          <M.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Our Facilities</span>
            <h1 className="text-4xl md:text-5xl font-black text-secondary mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Hostel Lifestyle
            </h1>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">
              Take a look at our facilities, events, and the vibrant life of our residents.
            </p>
          </M.div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></span>
          </div>
        ) : (
          <M.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
          >
            {images.map((img) => (
              <div
                key={img._id}
                className="relative group overflow-hidden rounded-2xl shadow-sm border border-gray-200 cursor-pointer break-inside-avoid bg-white"
                onClick={() => setSelectedImg(img)}
              >
                <img
                  src={img.url}
                  alt={img.caption || "Gallery image"}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-secondary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center backdrop-blur-sm">
                  <FiMaximize2 className="text-white text-3xl mb-3" />
                  {img.caption && (
                    <p className="text-white font-bold text-sm bg-black/40 px-4 py-1.5 rounded-full">{img.caption}</p>
                  )}
                </div>
              </div>
            ))}
          </M.div>
        )}

        {!loading && images.length === 0 && (
          <div className="text-center py-20 bg-white border border-gray-200 rounded-3xl mt-8">
            <p className="text-xl font-medium text-gray-400">No photos shared yet.</p>
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
            className="fixed inset-0 z-[100] bg-secondary/95 flex items-center justify-center p-4 backdrop-blur-md"
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
                className="max-h-[85vh] w-auto rounded-2xl shadow-2xl border border-gray-700"
              />
              {selectedImg.caption && (
                <p className="mt-6 text-white text-lg font-medium text-center bg-black/40 px-6 py-2 rounded-full backdrop-blur-md">
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
