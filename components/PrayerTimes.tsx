
import React, { useState, useEffect, useMemo } from 'react';
import { PrayerTimings, Language, Location, Surah } from '../types';
import { Loader2, BookOpen } from 'lucide-react';

interface PrayerTimesProps {
  location: Location;
  language: Language;
  lastRead?: { surah: number; ayah: number } | null;
  onNavigateToQuran?: () => void;
}

const PrayerTimes: React.FC<PrayerTimesProps> = ({ location, language, lastRead, onNavigateToQuran }) => {
  const [timings, setTimings] = useState<PrayerTimings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [now, setNow] = useState(new Date());
  const [lastSurahName, setLastSurahName] = useState<string>("");

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch surah name for lastRead display
  useEffect(() => {
    if (lastRead) {
      fetch(`https://api.alquran.cloud/v1/surah/${lastRead.surah}`)
        .then(res => res.json())
        .then(data => {
          if (data.code === 200) setLastSurahName(data.data.englishName);
        });
    }
  }, [lastRead]);

  useEffect(() => {
    const fetchTimings = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = "";
        if (location.isCurrent) {
          if (navigator.geolocation) {
            const pos: any = await new Promise((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            url = `https://api.aladhan.com/v1/timings?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&method=2`;
          } else {
            url = `https://api.aladhan.com/v1/timingsByCity?city=Paris&country=France&method=2`;
          }
        } else {
          url = `https://api.aladhan.com/v1/timingsByCity?city=${location.city}&country=${location.country}&method=2`;
        }
        const response = await fetch(url);
        const data = await response.json();
        if (data.code === 200) setTimings(data.data.timings);
      } catch (err) {
        setError("Chargement...");
      } finally {
        setLoading(false);
      }
    };
    fetchTimings();
  }, [location]);

  const t = {
    fr: {
      fajr: "Fajr", sunrise: "Chourouk", dhuhr: "Dhuhr", asr: "Asr", maghrib: "Maghrib", isha: "Isha",
      nextLabel: "PROCHAINE PRIÈRE", resume: "Reprendre"
    },
    ar: {
      fajr: "الفجر", sunrise: "الشروق", dhuhr: "الظهر", asr: "العصر", maghrib: "المغرب", isha: "العشاء",
      nextLabel: "الصلاة القادمة", resume: "مواصلة"
    }
  }[language];

  const prayerList = useMemo(() => {
    if (!timings) return [];
    return [
      { id: 'Fajr', name: t.fajr, time: timings.Fajr },
      { id: 'Sunrise', name: t.sunrise, time: timings.Sunrise },
      { id: 'Dhuhr', name: t.dhuhr, time: timings.Dhuhr },
      { id: 'Asr', name: t.asr, time: timings.Asr },
      { id: 'Maghrib', name: t.maghrib, time: timings.Maghrib },
      { id: 'Isha', name: t.isha, time: timings.Isha },
    ];
  }, [timings, t]);

  const nextPrayerData = useMemo(() => {
    if (!timings) return null;
    const currentTimeStr = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');
    
    let next = prayerList.find(p => p.time > currentTimeStr);
    if (!next) next = prayerList[0];

    const [h, m] = next.time.split(':').map(Number);
    let target = new Date(now);
    target.setHours(h, m, 0, 0);
    if (target < now) target.setDate(target.getDate() + 1);
    
    const diff = Math.floor((target.getTime() - now.getTime()) / 1000);
    const hh = Math.floor(diff / 3600).toString().padStart(2, '0');
    const mm = Math.floor((diff % 3600) / 60).toString().padStart(2, '0');
    const ss = (diff % 60).toString().padStart(2, '0');

    return { ...next, countdown: `${hh}:${mm}:${ss}` };
  }, [now, prayerList, timings]);

  if (loading) return (
    <div className="h-64 flex items-center justify-center bg-slate-900/20 rounded-[40px] border border-slate-800">
      <Loader2 className="animate-spin text-emerald-500" size={32} />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Main Card (Verte) */}
      {nextPrayerData && (
        <div className="bg-[#10b981] rounded-[40px] p-10 text-white shadow-2xl flex flex-col items-center text-center space-y-5 transition-all relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          
          <span className="text-[10px] font-bold tracking-[0.2em] opacity-90 uppercase relative z-10">{t.nextLabel}</span>
          <h2 className="text-6xl font-extrabold tracking-tight relative z-10">{nextPrayerData.name}</h2>
          
          <div className="bg-white/20 backdrop-blur-xl px-8 py-3 rounded-2xl font-mono text-2xl font-bold tracking-widest shadow-inner relative z-10">
            {nextPrayerData.countdown}
          </div>

          {lastRead && lastSurahName && (
            <button 
              onClick={onNavigateToQuran}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/20 px-6 py-2.5 rounded-full flex items-center gap-2 text-xs font-bold transition-all relative z-10"
            >
              <BookOpen size={16} />
              {t.resume} {lastSurahName} (Verset {lastRead.ayah})
            </button>
          )}

          <p className="text-sm opacity-90 font-medium pt-3 capitalize relative z-10">
            {now.toLocaleDateString(language === Language.FR ? 'fr-FR' : 'ar-SA', { 
              weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
            })}
          </p>
        </div>
      )}

      {/* Liste des horaires (Dark) */}
      <div className="space-y-3 px-1">
        {prayerList.map((prayer) => {
          const isNext = nextPrayerData?.id === prayer.id;
          return (
            <div 
              key={prayer.id}
              className={`flex items-center justify-between p-6 rounded-[24px] transition-all border-2 
                ${isNext 
                  ? 'bg-slate-900/40 border-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.1)]' 
                  : 'bg-slate-900/60 border-slate-800/50'
                }`}
            >
              <span className={`text-lg font-bold ${isNext ? 'text-white' : 'text-slate-300'}`}>
                {prayer.name}
              </span>
              <span className={`text-xl font-bold tracking-tight ${isNext ? 'text-emerald-400' : 'text-emerald-500/90'}`}>
                {prayer.time}
              </span>
            </div>
          );
        })}
      </div>
      {error && <div className="text-center text-xs text-red-400 opacity-50">{error}</div>}
    </div>
  );
};

export default PrayerTimes;
