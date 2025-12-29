
import React, { useState, useEffect, useRef } from 'react';
import { Language, Surah, Ayah, Reciter } from '../types';
import { Search, Play, Pause, ChevronLeft, BookOpen, Clock } from 'lucide-react';

interface QuranReaderProps {
  language: Language;
  reciter: Reciter;
  lastRead: { surah: number; ayah: number } | null;
  onSetLastRead: (surah: number, ayah: number) => void;
}

const QuranReader: React.FC<QuranReaderProps> = ({ language, reciter, lastRead, onSetLastRead }) => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingAyah, setPlayingAyah] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const res = await fetch('https://api.alquran.cloud/v1/surah');
        const data = await res.json();
        setSurahs(data.data);
      } catch (e) {
        console.error("Error loading surahs", e);
      } finally {
        setLoading(false);
      }
    };
    fetchSurahs();
  }, []);

  const loadSurah = async (number: number) => {
    setLoading(true);
    try {
      const textRes = await fetch(`https://api.alquran.cloud/v1/surah/${number}/ar.alafasy`);
      const textData = await textRes.json();
      const transRes = await fetch(`https://api.alquran.cloud/v1/surah/${number}/fr.hamidullah`);
      const transData = await transRes.json();

      const combinedAyahs = textData.data.ayahs.map((ayah: any, index: number) => ({
        ...ayah,
        translation: transData.data.ayahs[index].text,
        audio: `https://cdn.islamic.network/quran/audio/128/${reciter.identifier}/${ayah.number}.mp3`
      }));

      setAyahs(combinedAyahs);
      setSelectedSurah(surahs.find(s => s.number === number) || null);
      onSetLastRead(number, 1);
    } catch (e) {
      console.error("Error loading ayahs", e);
    } finally {
      setLoading(false);
    }
  };

  const playAudio = (ayah: Ayah) => {
    if (playingAyah === ayah.number) {
      audioRef.current?.pause();
      setPlayingAyah(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = ayah.audio || "";
        audioRef.current.play();
        setPlayingAyah(ayah.number);
      }
    }
  };

  const filteredSurahs = surahs.filter(s => 
    s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.name.includes(searchQuery)
  );

  const t = {
    fr: { back: "Retour", search: "Rechercher une sourate...", title: "Le Saint Coran", lastRead: "Reprendre la lecture" },
    ar: { back: "عودة", search: "بحث عن سورة", title: "القرآن الكريم", lastRead: "مواصلة القراءة" }
  }[language];

  if (loading && !selectedSurah) return (
    <div className="p-20 flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
      <p className="text-slate-500 text-sm font-medium">Chargement du Coran...</p>
    </div>
  );

  if (!selectedSurah) {
    const lastSurahName = lastRead ? surahs.find(s => s.number === lastRead.surah)?.englishName : null;

    return (
      <div className="space-y-6">
        {/* Last Read Banner */}
        {lastRead && lastSurahName && (
          <div 
            onClick={() => loadSurah(lastRead.surah)}
            className="bg-emerald-500/10 border border-emerald-500/30 p-5 rounded-[32px] flex items-center justify-between cursor-pointer hover:bg-emerald-500/15 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="bg-emerald-500 text-white p-3 rounded-2xl shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                <Clock size={20} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{t.lastRead}</span>
                <h4 className="text-white font-bold">{lastSurahName}</h4>
                <p className="text-slate-400 text-[10px]">Verset {lastRead.ayah}</p>
              </div>
            </div>
            <BookOpen className="text-emerald-500 opacity-50" size={20} />
          </div>
        )}

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.search}
            className="w-full bg-slate-900/40 border border-slate-800 text-white rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-sm transition-all"
          />
        </div>
        
        <div className="grid grid-cols-1 gap-3 pb-20">
          {filteredSurahs.map(surah => (
            <div 
              key={surah.number}
              onClick={() => loadSurah(surah.number)}
              className="bg-slate-900/40 p-5 rounded-[28px] border border-slate-800/50 flex items-center justify-between cursor-pointer hover:border-emerald-500/40 transition-all group active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-slate-800 text-slate-400 flex items-center justify-center rounded-2xl font-bold group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  {surah.number}
                </div>
                <div>
                  <h3 className="font-bold text-slate-100">{surah.englishName}</h3>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider">{surah.englishNameTranslation}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="arabic-text text-2xl font-bold text-emerald-400">{surah.name}</p>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{surah.numberOfAyahs} Versets</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/40 rounded-[40px] border border-slate-800 min-h-screen flex flex-col overflow-hidden transition-colors mb-20 animate-in fade-in zoom-in-95 duration-300">
      <audio ref={audioRef} onEnded={() => setPlayingAyah(null)} />
      
      <div className="bg-slate-900/60 p-6 border-b border-slate-800 sticky top-0 flex items-center justify-between z-20 backdrop-blur-xl">
        <button 
          onClick={() => setSelectedSurah(null)}
          className="p-3 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl transition-all active:scale-90"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="text-center">
          <h2 className="font-bold text-slate-100">{selectedSurah.englishName}</h2>
          <p className="arabic-text text-sm text-emerald-400">{selectedSurah.name}</p>
        </div>
        <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center font-bold text-sm">
          {selectedSurah.number}
        </div>
      </div>

      <div className="p-8 space-y-12 flex-1 pb-32">
        {ayahs.map((ayah) => (
          <div key={ayah.number} className="group border-b border-slate-800/50 pb-12 last:border-0">
            <div className="flex justify-between items-center mb-8">
              <span className="w-8 h-8 bg-slate-800 text-slate-500 rounded-xl flex items-center justify-center text-[10px] font-bold">
                {ayah.numberInSurah}
              </span>
              <button 
                onClick={() => playAudio(ayah)}
                className={`p-4 rounded-2xl shadow-xl transition-all ${playingAyah === ayah.number ? 'bg-emerald-500 text-white scale-110 shadow-emerald-500/40' : 'bg-slate-800 text-emerald-400 hover:bg-emerald-500 hover:text-white'}`}
              >
                {playingAyah === ayah.number ? <Pause size={20} /> : <Play size={20} />}
              </button>
            </div>
            <p className="arabic-text text-4xl leading-[2] text-slate-100 text-right mb-8">
              {ayah.text}
            </p>
            {language === Language.FR && (
              <p className="text-slate-400 text-sm leading-relaxed italic border-l-2 border-emerald-500/30 pl-6 py-1">
                {(ayah as any).translation}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuranReader;
