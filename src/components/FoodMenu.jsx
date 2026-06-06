import { useState, useEffect } from "react";
import { motion as M } from "framer-motion";
import { FiSun, FiMoon, FiCoffee, FiMessageCircle, FiPhone } from "react-icons/fi";

const menuData = [
  {
    day: "Monday",
    hi: { breakfast: "रोटी, सब्जी", lunch: "चावल, दाल, सब्जी, अचार", dinner: "वेज बिरयानी, रायता" },
    en: { breakfast: "Roti, Sabzi", lunch: "Rice, Dal, Sabzi, Pickle", dinner: "Veg Biryani, Raita" }
  },
  {
    day: "Tuesday",
    hi: { breakfast: "पूरी, सब्जी", lunch: "चावल, दाल, सब्जी, पापड़", dinner: "रोटी, सब्जी, खीर" },
    en: { breakfast: "Puri, Sabzi", lunch: "Rice, Dal, Sabzi, Papad", dinner: "Roti, Sabzi, Kheer" }
  },
  {
    day: "Wednesday",
    hi: { breakfast: "सत्तू पराठा, चटनी", lunch: "चावल, दाल, चोखा, तिलौरी", dinner: "रोटी, अंडा / पनीर कढ़ी" },
    en: { breakfast: "Sattu Paratha, Chutney", lunch: "Rice, Dal, Chokha, Tilauri", dinner: "Roti, Egg / Paneer Curry" }
  },
  {
    day: "Thursday",
    hi: { breakfast: "छोला, पूरी", lunch: "राजमा, चावल", dinner: "रोटी, सब्जी" },
    en: { breakfast: "Chole, Puri", lunch: "Rajma, Rice", dinner: "Roti, Sabzi" }
  },
  {
    day: "Friday",
    hi: { breakfast: "पोहा", lunch: "चावल, दाल, भुजिया, अचार", dinner: "रोटी, चिकन / पनीर, चावल" },
    en: { breakfast: "Poha", lunch: "Rice, Dal, Bhujia, Pickle", dinner: "Roti, Chicken / Paneer, Rice" }
  },
  {
    day: "Saturday",
    hi: { breakfast: "पराठा, भुजिया", lunch: "खिचड़ी, चोखा, दही, पापड़", dinner: "रोटी, तड़का, सलाद" },
    en: { breakfast: "Paratha, Bhujia", lunch: "Khichdi, Chokha, Curd, Papad", dinner: "Roti, Tadka, Salad" }
  },
  {
    day: "Sunday",
    hi: { breakfast: "आलू पराठा, Sauce", lunch: "चावल, दाल, सब्जी", dinner: "रोटी, चिकन / पनीर, चावल" },
    en: { breakfast: "Aloo Paratha, Sauce", lunch: "Rice, Dal, Sabzi", dinner: "Roti, Chicken / Paneer, Rice" }
  }
];

export default function FoodMenu() {
  const [lang, setLang] = useState("en");
  const [currentDayIndex, setCurrentDayIndex] = useState(0);

  useEffect(() => {
    // getDay() returns 0 for Sunday, 1 for Monday.
    // Our array is 0=Monday ... 6=Sunday.
    const day = new Date().getDay();
    const index = day === 0 ? 6 : day - 1;
    setCurrentDayIndex(index);
  }, []);

  return (
    <section className="py-20 bg-[#eef4fb] relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-blue-200/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 bg-indigo-200/40 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-10">
          <M.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-primary text-xs font-bold uppercase tracking-widest shadow-sm mb-4"
          >
            Food Menu
          </M.div>
          <M.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-secondary mb-4 tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Hygienic Home-Style <br className="hidden md:block" />
            <span className="text-primary">Meals Every Day</span>
          </M.h2>
          <M.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base font-medium"
          >
            Fresh breakfast, lunch & dinner cooked daily in our clean kitchen — fully included in your rent. No extra charge.
          </M.p>
        </div>

        {/* Language Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1 rounded-full shadow-sm flex items-center border border-gray-100">
            <button
              onClick={() => setLang("en")}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                lang === "en" ? "bg-primary text-white shadow-md" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLang("hi")}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                lang === "hi" ? "bg-primary text-white shadow-md" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              हिन्दी (Hindi)
            </button>
          </div>
        </div>

        {/* Menu Table/Grid */}
        <M.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8"
        >
          {/* Header */}
          <div className="grid grid-cols-4 bg-secondary text-white text-xs md:text-sm font-bold tracking-wider py-4 px-2 md:px-6 uppercase">
            <div className="flex items-center gap-2">
               <FiSun className="hidden md:block text-gray-400" /> Day
            </div>
            <div className="flex items-center gap-2 text-yellow-400">
               <FiCoffee /> Breakfast
            </div>
            <div className="flex items-center gap-2 text-blue-300">
               <FiSun /> Lunch
            </div>
            <div className="flex items-center gap-2 text-indigo-300">
               <FiMoon /> Dinner
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-col">
            {menuData.map((item, index) => {
              const isToday = index === currentDayIndex;
              return (
                <div 
                  key={item.day} 
                  className={`grid grid-cols-4 px-2 md:px-6 py-4 md:py-5 border-b border-gray-100 last:border-0 transition-colors ${
                    isToday ? "bg-yellow-50/80" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex flex-col justify-center">
                    <span className={`font-bold text-sm md:text-base ${isToday ? "text-yellow-700" : "text-gray-800"}`}>
                      {item.day}
                    </span>
                    {isToday && (
                      <span className="bg-yellow-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase w-max mt-1 shadow-sm tracking-wider">
                        Today
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-xs md:text-sm font-medium text-gray-600 pr-2">
                    {item[lang].breakfast}
                  </div>
                  <div className="flex items-center text-xs md:text-sm font-medium text-gray-600 pr-2 border-l border-gray-100 pl-2 md:pl-4">
                    {item[lang].lunch}
                  </div>
                  <div className="flex items-center text-xs md:text-sm font-medium text-gray-600 border-l border-gray-100 pl-2 md:pl-4">
                    {item[lang].dinner}
                  </div>
                </div>
              );
            })}
          </div>
        </M.div>

        {/* Action Buttons */}
        <M.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a 
            href="https://wa.me/919708169442" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-green-500/30 transition-all transform hover:scale-105"
          >
            <FiMessageCircle size={20} />
            Enquire About Food & Rooms
          </a>
          <a 
            href="tel:+919708169442"
            className="flex items-center gap-2 bg-white hover:bg-gray-50 text-primary border-2 border-primary/20 font-bold py-3 px-8 rounded-full shadow-sm transition-all transform hover:scale-105"
          >
            <FiPhone size={20} />
            Call +91 9708169442
          </a>
        </M.div>
      </div>
    </section>
  );
}
