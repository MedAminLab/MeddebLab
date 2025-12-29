
import React, { useState, useMemo } from 'react';
import { Language, Dua } from '../types';
import { DUAS } from '../constants';
import { Copy, Heart, Check } from 'lucide-react';

interface DuaSectionProps {
  language: Language;
}

const DuaSection: React.FC<DuaSectionProps> = ({ language }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    DUAS.forEach(d => cats.add(language === Language.FR ? d.category_fr : d.category_ar));
    return ["All", ...Array.from(cats)];
  }, [language]);

  const filteredDuas = useMemo(() => {
    if (selectedCategory === "All") return DUAS;
    return DUAS.filter(d => 
      (language === Language.FR ? d.category_fr : d.category_ar) === selectedCategory
    );
  }, [selectedCategory, language]);

  const handleCopy = (dua: Dua) => {
    navigator.clipboard.writeText(dua.text_ar);
    setCopiedId(dua.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const t = {
    fr: { title: "Douas & Invocations", all: "Toutes", copied: "Copié !" },
    ar: { title: "الأدعية والأذكار", all: "الكل", copied: "تم النسخ" }
  }[language];

  return (
    <div className="space-y-6 pb-20">
      <header className="space-y-4">
        <h2 className="text-3xl font-bold text-white px-2">{t.title}</h2>
        
        {/* Category Chips Selector */}
        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide px-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all border-2
                ${selectedCategory === cat 
                  ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                  : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'}`}
            >
              {cat === "All" ? t.all : cat}
            </button>
          ))}
        </div>
      </header>
      
      <div className="grid gap-5 px-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {filteredDuas.map(dua => (
          <div 
            key={dua.id} 
            className="bg-slate-900/60 rounded-[32px] p-7 border border-slate-800/50 hover:border-emerald-500/30 transition-all group"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full">
                  {language === Language.FR ? dua.category_fr : dua.category_ar}
                </span>
                <h3 className="font-bold text-slate-200 text-lg">
                  {language === Language.FR ? dua.title_fr : dua.title_ar}
                </h3>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleCopy(dua)}
                  className={`p-3 rounded-2xl transition-all ${copiedId === dua.id ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-emerald-500'}`}
                >
                  {copiedId === dua.id ? <Check size={18} /> : <Copy size={18} />}
                </button>
                <button className="p-3 bg-slate-800 text-slate-400 hover:text-pink-500 rounded-2xl transition-all">
                  <Heart size={18} />
                </button>
              </div>
            </div>
            
            <div className="relative">
              <p className="arabic-text text-3xl text-white text-right mb-8 leading-[1.8] dark:text-emerald-50/90">
                {dua.text_ar}
              </p>
            </div>
            
            <div className="pt-6 border-t border-slate-800/50">
              <p className="text-slate-400 text-sm leading-relaxed italic">
                {dua.text_fr}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredDuas.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          Aucune invocation dans cette catégorie.
        </div>
      )}
    </div>
  );
};

export default DuaSection;
