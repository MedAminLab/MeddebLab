
import React, { useState, useEffect } from 'react';
import { Language, Reciter, Location } from './types';
import { RECITERS, LogoCrescent } from './constants';
import PrayerTimes from './components/PrayerTimes';
import QuranReader from './components/QuranReader';
import DuaSection from './components/DuaSection';
import Settings from './components/Settings';
import { 
  BookOpen, 
  Heart, 
  Settings as SettingsIcon,
  LayoutDashboard,
  MapPin,
  ChevronDown
} from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'quran' | 'duas' | 'settings'>('home');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('meddeb_lang');
    return (saved as Language) || Language.FR;
  });
  const [reciter, setReciter] = useState<Reciter>(() => {
    const saved = localStorage.getItem('meddeb_reciter');
    return saved ? JSON.parse(saved) : RECITERS[0];
  });
  const [locations, setLocations] = useState<Location[]>(() => {
    const saved = localStorage.getItem('meddeb_locations');
    return saved ? JSON.parse(saved) : [{ id: 'current', name: 'Ma position', city: '', country: '', isCurrent: true }];
  });
  const [selectedLocationId, setSelectedLocationId] = useState<string>('current');
  const [lastRead, setLastRead] = useState<{ surah: number; ayah: number } | null>(() => {
    const saved = localStorage.getItem('meddeb_last_read');
    return saved ? JSON.parse(saved) : null;
  });

  const selectedLocation = locations.find(l => l.id === selectedLocationId) || locations[0];

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('meddeb_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('meddeb_theme', 'light');
    }
  };

  useEffect(() => {
    localStorage.setItem('meddeb_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('meddeb_locations', JSON.stringify(locations));
  }, [locations]);

  const handleSetLastRead = (surah: number, ayah: number) => {
    const newLastRead = { surah, ayah };
    setLastRead(newLastRead);
    localStorage.setItem('meddeb_last_read', JSON.stringify(newLastRead));
  };

  const t = {
    fr: { home: "Prière", quran: "Coran", duas: "Douas", settings: "Réglages" },
    ar: { home: "الصلاة", quran: "القرآن", duas: "الأدعية", settings: "الإعدادات" }
  }[language];

  return (
    <div className={`min-h-screen pb-24 flex flex-col ${language === Language.AR ? 'rtl' : 'ltr'} bg-[#0f172a] dark:bg-[#020617] transition-colors duration-300`}>
      <header className="p-5 flex items-center justify-between sticky top-0 z-50 bg-[#0f172a]/80 backdrop-blur-lg">
        <div className="flex items-center gap-2">
          <LogoCrescent className="w-8 h-8 text-[#10b981]" />
          <h1 className="text-2xl font-bold tracking-tight text-white">Meddeb</h1>
        </div>
        
        <div className="relative group">
          <div className="flex items-center gap-2 bg-[#10b981]/10 text-[#10b981] px-4 py-2 rounded-full border border-[#10b981]/20 cursor-pointer hover:bg-[#10b981]/20 transition-all">
            <MapPin size={14} />
            <span className="text-xs font-semibold lowercase">{selectedLocation.name}</span>
            <ChevronDown size={14} className="opacity-50" />
          </div>
          
          <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
            {locations.map(loc => (
              <button
                key={loc.id}
                onClick={() => setSelectedLocationId(loc.id)}
                className={`w-full text-left px-4 py-3 text-xs font-medium hover:bg-slate-700 transition-colors ${selectedLocationId === loc.id ? 'text-emerald-400 bg-emerald-400/5' : 'text-slate-300'}`}
              >
                {loc.name}
              </button>
            ))}
            <button 
              onClick={() => setActiveTab('settings')}
              className="w-full text-left px-4 py-3 text-xs font-bold text-emerald-500 border-t border-slate-700 hover:bg-emerald-500/10 transition-colors"
            >
              + Gérer les lieux
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full p-4 overflow-y-auto">
        {activeTab === 'home' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <PrayerTimes 
              location={selectedLocation} 
              language={language} 
              lastRead={lastRead} 
              onNavigateToQuran={() => setActiveTab('quran')}
            />
            
            <div className="grid grid-cols-2 gap-4 mt-8">
               <div 
                onClick={() => setActiveTab('quran')}
                className="bg-slate-900/40 p-5 rounded-[32px] border border-slate-800 flex flex-col items-center gap-3 cursor-pointer hover:border-emerald-500/50 transition-all active:scale-95"
               >
                 <div className="p-3 bg-emerald-500/10 rounded-full text-emerald-500"><BookOpen size={24} /></div>
                 <span className="font-semibold text-slate-300">{t.quran}</span>
               </div>
               <div 
                onClick={() => setActiveTab('duas')}
                className="bg-slate-900/40 p-5 rounded-[32px] border border-slate-800 flex flex-col items-center gap-3 cursor-pointer hover:border-pink-500/50 transition-all active:scale-95"
               >
                 <div className="p-3 bg-pink-500/10 rounded-full text-pink-500"><Heart size={24} /></div>
                 <span className="font-semibold text-slate-300">{t.duas}</span>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'quran' && (
          <QuranReader 
            language={language} 
            reciter={reciter} 
            lastRead={lastRead} 
            onSetLastRead={handleSetLastRead} 
          />
        )}

        {activeTab === 'duas' && (
          <DuaSection language={language} />
        )}

        {activeTab === 'settings' && (
          <Settings 
            language={language} 
            setLanguage={setLanguage}
            reciter={reciter}
            setReciter={setReciter}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            locations={locations}
            setLocations={setLocations}
          />
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-[#0f172a]/95 backdrop-blur-md border-t border-slate-800 px-6 py-4 flex justify-around items-center z-50 rounded-t-[32px] shadow-2xl transition-colors">
        <NavItem active={activeTab === 'home'} onClick={() => setActiveTab('home')} icon={<LayoutDashboard size={24} />} label={t.home} />
        <NavItem active={activeTab === 'quran'} onClick={() => setActiveTab('quran')} icon={<BookOpen size={24} />} label={t.quran} />
        <NavItem active={activeTab === 'duas'} onClick={() => setActiveTab('duas')} icon={<Heart size={24} />} label={t.duas} />
        <NavItem active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon={<SettingsIcon size={24} />} label={t.settings} />
      </nav>
    </div>
  );
};

const NavItem: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-emerald-500 scale-110' : 'text-slate-500 hover:text-slate-300'}`}
  >
    {icon}
    <span className="text-[9px] font-bold uppercase tracking-widest">{label}</span>
  </button>
);

export default App;
