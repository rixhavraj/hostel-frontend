import { useState, useEffect } from "react";
import axios from "axios";
import { FiSave, FiBell, FiToggleLeft, FiToggleRight, FiInfo, FiCheckCircle } from "react-icons/fi";
import API_URL from "../../api";

export default function SettingsTab() {
  const [settings, setSettings] = useState({
    announcement: "",
    showAnnouncement: false
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/settings`);
        setSettings(res.data);
      } catch (err) {
        console.error("Error fetching settings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`${API_URL}/api/settings`, settings, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      alert("Error saving settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center p-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;

  return (
    <div className="max-w-4xl space-y-6">
      <div className="bg-white/60 backdrop-blur-md p-6 rounded-[2rem] border border-white shadow-xl shadow-slate-200/50">
        <h2 className="text-2xl font-black text-slate-800">Site Settings</h2>
        <p className="text-slate-500 text-sm">Manage global features and notifications</p>
      </div>

      <div className="bg-white/80 backdrop-blur-md p-8 rounded-[3rem] shadow-sm border border-white/50">
        <form onSubmit={handleSave} className="space-y-8">
          {/* Hot Section Announcement */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
                  <FiBell size={24} />
                </div>
                <div>
                  <h3 className="font-black text-slate-800">Hot Section (Announcement Bar)</h3>
                  <p className="text-xs text-slate-500 font-medium">Display a global alert at the top of the website</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSettings(p => ({ ...p, showAnnouncement: !p.showAnnouncement }))}
                className={`text-4xl transition-colors ${settings.showAnnouncement ? 'text-blue-600' : 'text-slate-300'}`}
              >
                {settings.showAnnouncement ? <FiToggleRight /> : <FiToggleLeft />}
              </button>
            </div>

            <div className={`space-y-3 transition-all ${settings.showAnnouncement ? 'opacity-100' : 'opacity-40 grayscale pointer-events-none'}`}>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Announcement Message</label>
              <textarea
                value={settings.announcement}
                onChange={(e) => setSettings(p => ({ ...p, announcement: e.target.value }))}
                className="input-field min-h-[100px] resize-none py-4 leading-relaxed font-medium text-slate-700"
                placeholder="Ex: Special Discount! Book within 24 hours to get 20% off on premium rooms."
              />
              <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 flex gap-3">
                <FiInfo className="text-blue-500 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700 font-medium leading-relaxed">
                  Changes made here will reflect instantly on the public website's top bar. Use this for urgent updates, discounts, or hostel news.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <div className={`text-sm font-bold text-green-600 flex items-center gap-2 transition-opacity ${success ? 'opacity-100' : 'opacity-0'}`}>
              <FiCheckCircle /> Settings updated successfully!
            </div>
            <button
              type="submit"
              disabled={saving}
              className="btn-primary min-w-[160px] justify-center py-4 rounded-2xl shadow-xl shadow-blue-200"
            >
              {saving ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </div>
              ) : (
                <><FiSave /> Save Changes</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
