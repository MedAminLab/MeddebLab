
import React, { useState } from 'react';
import { Language, Reciter, Location } from '../types';
import { RECITERS } from '../constants';
import { Globe, User, Info, Smartphone, Moon, Sun, MapPin, Plus, X, Search } from 'lucide-react';

interface SettingsProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  reciter: Reciter;
  setReciter: (r: Reciter) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  locations: Location[];
  setLocations: (locs: Location[]) => void;
}

const Settings: React.FC<SettingsProps> = ({ 
  language, setLanguage, reciter, setReciter, isDarkMode, toggleDarkMode, locations, setLocations 
}) => {
  const [newCity, setNewCity] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const t = {
    fr: {
      title: "Réglages",
      theme: "Apparence", themeDark: "Mode Sombre", themeLight: "Mode Clair",
      lang: "Langue",
      reciter: "Récitateur par défaut",
      locations: "Emplacements favoris",
      addLocation: "Ajouter un lieu",
      cityName: "Nom de la ville",
      countryName: "Pays",
      add: "Ajouter",
      about: "À propos",
      version: "Version 1.2.0",
      install: "PWA Active"
    },
    ar: {
      title: "الإعدادات",
      theme: "المظهر", themeDark: "الوضع الليلي", themeLight: "الوضع الفاتح",
      lang: "اللغة",
      reciter: "القاريء المفضل",
      locations: "الأماكن المفضلة",
      addLocation: "إضافة مكان",
      cityName: "اسم المدينة",
      countryName: "البلد",
      add: "إضافة",
      about: "حول التطبيق",
      version: "الإصدار 1.2.0",
      install: "تطبيق مثبت"
    }
  }[language];

  const handleAddLocation = () => {
    if (newCity && newCountry) {
      const newLoc: Location = {
        id: Date.now().toString(),
        name: `${newCity}, ${newCountry}`,
        city: newCity,
        country: newCountry
      };
      setLocations([...locations, newLoc]);
      setNewCity("");
      setNewCountry("");
      setShowAdd(false);
    }
  };

  const removeLocation = (id: string) => {
    if (id === 'current') return;
    setLocations(locations.filter(l => l.id !== id));
  };

  return (
    <div className="space-y-6 pb-20">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{t.title}</h2>
      
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors">
        
        {/* Theme Section */}
        <div className="p-6 border-b border-slate-50 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-4 text-emerald-600 dark:text-emerald-400 font-bold">
            {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
            <span className="text-sm">{t.theme}</span>
          </div>
          <button 
            onClick={toggleDarkMode}
            className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl flex items-center justify-between group transition-all"
          >
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{isDarkMode ? t.themeDark : t.themeLight}</span>
            <div className={`w-12 h-6 rounded-full relative transition-colors ${isDarkMode ? 'bg-emerald-600' : 'bg-slate-300'}`}>
               <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isDarkMode ? 'left-7' : 'left-1'}`}></div>
            </div>
          </button>
        </div>

        {/* Locations Section */}
        <div className="p-6 border-b border-slate-50 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 font-bold">
              <MapPin size={18} />
              <span className="text-sm">{t.locations}</span>
            </div>
            <button 
              onClick={() => setShowAdd(!showAdd)}
              className="p-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl"
            >
              <Plus size={18} />
            </button>
          </div>

          {showAdd && (
            <div className="mb-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl space-y-3 animate-in slide-in-from-top-2">
              <input 
                type="text" 
                placeholder={t.cityName}
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              <input 
                type="text" 
                placeholder={t.countryName}
                value={newCountry}
                onChange={(e) => setNewCountry(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              <button 
                onClick={handleAddLocation}
                className="w-full bg-emerald-600 text-white py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-emerald-200 dark:shadow-none"
              >
                {t.add}
              </button>
            </div>
          )}

          <div className="space-y-2">
            {locations.map(loc => (
              <div key={loc.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                <span className="text-sm font-medium dark:text-slate-200">{loc.name}</span>
                {!loc.isCurrent && (
                  <button onClick={() => removeLocation(loc.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Reciter Section */}
        <div className="p-6 border-b border-slate-50 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-4 text-emerald-600 dark:text-emerald-400 font-bold">
            <User size={18} />
            <span className="text-sm">{t.reciter}</span>
          </div>
          <div className="grid gap-2 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin">
            {RECITERS.map(r => (
              <button 
                key={r.id}
                onClick={() => setReciter(r)}
                className={`w-full text-left p-3.5 rounded-2xl flex items-center justify-between transition-all border-2 ${reciter.id === r.id ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-700 dark:text-emerald-400' : 'bg-slate-50 dark:bg-slate-800 border-transparent text-slate-600 dark:text-slate-400'}`}
              >
                <span className="font-bold text-xs">{r.name}</span>
                {reciter.id === r.id && <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>}
              </button>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/30">
          <div className="flex items-center gap-3 mb-4 text-slate-400 dark:text-slate-500 font-bold">
            <Info size={18} />
            <span className="text-sm">{t.about}</span>
          </div>
          <div className="flex flex-col gap-2 text-[10px] text-slate-500 dark:text-slate-400">
             <div className="flex justify-between items-center font-bold">
               <span>{t.version}</span>
               <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-500">
                 <Smartphone size={12} />
                 <span>{t.install}</span>
               </div>
             </div>
             <p className="mt-2 leading-relaxed opacity-60">
               Meddeb est votre compagnon spirituel quotidien.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
