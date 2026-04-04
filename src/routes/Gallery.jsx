import { useState, useEffect } from "react";
import axios from "axios";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { FiMaximize2, FiX, FiCalendar, FiImage } from "react-icons/fi";
import API_URL from "../api";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

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
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <Motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold text-slate-900"
          >
            Hostel <span className="gradient-text">Lifestyle</span>
          </Motion.h1>
          <Motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-600 max-w-lg mx-auto"
          >
            Take a look at our facilities, events, and the vibrant life of our residents.
          </Motion.p>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <Motion.div
            variants={{
              show: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            animate="show"
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
          >
            {images.map((img) => (
              <Motion.div
                key={img._id}
                variants={fadeUp}
                className="relative group overflow-hidden rounded-2xl bg-white shadow-md cursor-pointer break-inside-avoid"
                onClick={() => setSelectedImg(img)}
              >
                <img
                  src={img.url}
                  alt={img.caption || "Gallery image"}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                  <FiMaximize2 className="text-white text-3xl mb-2" />
                  {img.caption && (
                    <p className="text-white font-medium text-sm">{img.caption}</p>
                  )}
                </div>
              </Motion.div>
            ))}
          </Motion.div>
        )}

        {!loading && images.length === 0 && (
          <div className="text-center py-20 grayscale opacity-50">
            <p className="text-xl font-medium text-slate-500">No photos shared yet.</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedImg(null)}
          >
            <button
              className="absolute top-6 right-6 text-white hover:text-blue-400 transition-colors"
              onClick={() => setSelectedImg(null)}
            >
              <FiX size={32} />
            </button>
            <Motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-5xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImg.url}
                alt={selectedImg.caption}
                className="max-h-[80vh] w-auto rounded-xl shadow-2xl"
              />
              {selectedImg.caption && (
                <p className="mt-4 text-white text-lg font-medium text-center bg-black/50 px-6 py-2 rounded-full backdrop-blur-md">
                  {selectedImg.caption}
                </p>
              )}
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
