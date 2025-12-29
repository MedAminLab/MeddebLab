
import React from 'react';
import { Reciter, Dua } from './types';

export const RECITERS: Reciter[] = [
  { id: '1', name: 'Mishary Rashid Alafasy', identifier: 'ar.alafasy' },
  { id: '2', name: 'AbdulBaset AbdulSamad (Murattal)', identifier: 'ar.abdulsamad' },
  { id: '3', name: 'Abdurrahmane Al-Soudais', identifier: 'ar.abdurrahmansudais' },
  { id: '4', name: 'Mahmoud Khalil Al-Hussary', identifier: 'ar.husary' },
  { id: '5', name: 'Mohamed Siddiq El-Minshawi', identifier: 'ar.minshawi' },
  { id: '6', name: 'Abu Bakr Al-Shatri', identifier: 'ar.shaatree' },
  { id: '7', name: 'Ahmed Al-Ajmi', identifier: 'ar.ahmedajamy' },
  { id: '8', name: 'Saad Al-Ghamdi', identifier: 'ar.saoodshuraym' },
  { id: '9', name: 'Maher Al-Muaiqly', identifier: 'ar.mahermuaiqly' },
  { id: '10', name: 'Yasser Al-Dosari', identifier: 'ar.yasseradosari' },
  { id: '11', name: 'Ali Al-Huthaify', identifier: 'ar.hudhaify' },
  { id: '12', name: 'Abdullah Al-Matrood', identifier: 'ar.matroud' },
  { id: '13', name: 'Muhammad Al-Luhaidan', identifier: 'ar.luhaidan' },
  { id: '14', name: 'Fares Abbad', identifier: 'ar.faresabbad' },
  { id: '15', name: 'Idrees Abkar', identifier: 'ar.idreesabkar' },
  { id: '16', name: 'Nasser Al Qatami', identifier: 'ar.nasserqatami' },
  { id: '17', name: 'Salah Al-Budair', identifier: 'ar.salahalbudair' },
  { id: '18', name: 'Hani Ar-Rifai', identifier: 'ar.hanirifai' },
  { id: '19', name: 'Khalid Al-Jaleel', identifier: 'ar.khalidjaleel' },
  { id: '20', name: 'Bandar Baleela', identifier: 'ar.bandarbaleela' }
];

export const DUAS: Dua[] = [
  // MATIN & SOIR
  {
    id: 1,
    category_fr: "Matin & Soir",
    category_ar: "أذكار الصباح والمساء",
    title_fr: "Invocation du matin",
    title_ar: "دعاء الصباح",
    text_ar: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ",
    text_fr: "Nous sommes au matin et la royauté appartient à Allah. Louange à Allah. Nul ne mérite d'être adoré en dehors d'Allah."
  },
  {
    id: 4,
    category_fr: "Matin & Soir",
    category_ar: "أذكار الصباح والمساء",
    title_fr: "Protection totale",
    title_ar: "بسم الله الذي لا يضر",
    text_ar: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    text_fr: "Au nom d'Allah, tel qu'en compagnie de Son Nom rien ne peut nuire sur terre ni dans le ciel, et Il est l'Audient, l'Omniscient."
  },
  // VIE QUOTIDIENNE
  {
    id: 2,
    category_fr: "Sommeil",
    category_ar: "النوم",
    title_fr: "Avant de dormir",
    title_ar: "قبل النوم",
    text_ar: "بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ",
    text_fr: "C'est en Ton nom, Seigneur, que je me couche et c'est par Toi que je me lève."
  },
  {
    id: 5,
    category_fr: "Sommeil",
    category_ar: "النوم",
    title_fr: "Au réveil",
    title_ar: "عند الاستيقاظ",
    text_ar: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    text_fr: "Louange à Allah qui nous a rendu la vie après nous avoir fait mourir, et vers Lui se fera le Retour."
  },
  // FAMILLE
  {
    id: 3,
    category_fr: "Famille",
    category_ar: "الأهل والوالدين",
    title_fr: "Pour les parents",
    title_ar: "دعاء للوالدين",
    text_ar: "رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
    text_fr: "Ô mon Seigneur, fais-leur, à tous deux, miséricorde comme ils m'ont élevé tout petit."
  },
  {
    id: 6,
    category_fr: "Famille",
    category_ar: "الأهل والوالدين",
    title_fr: "Pour la descendance",
    title_ar: "دعاء للذرية",
    text_ar: "رَبِّ هَبْ لِي مِن لَّدُنكَ ذُرِّيَّةً طَيِّبَةً ۖ إِنَّكَ سَمِيعُ الدُّعَاءِ",
    text_fr: "Ô mon Seigneur, donne-moi, de Ta part, une bonne descendance. Car Tu es Celui qui entend bien la prière."
  },
  // DIFFICULTÉ
  {
    id: 7,
    category_fr: "Difficulté",
    category_ar: "الكرب والضيق",
    title_fr: "En cas d'angoisse",
    title_ar: "دعاء الكرب",
    text_ar: "لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
    text_fr: "Nul n'est digne d'être adoré en dehors de Toi ! Pureté à Toi ! J'ai été vraiment du nombre des injustes."
  },
  {
    id: 8,
    category_fr: "Difficulté",
    category_ar: "الكرب والضيق",
    title_fr: "Facilitation des choses",
    title_ar: "تيسير الأمور",
    text_ar: "اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا",
    text_fr: "Ô Allah, rien n'est facile, sauf ce que Tu as rendu facile, et Tu es Celui qui rend la difficulté facile, si Tu le veux."
  },
  // VOYAGE
  {
    id: 9,
    category_fr: "Voyage",
    category_ar: "السفر",
    title_fr: "Invocation du voyage",
    title_ar: "دعاء السفر",
    text_ar: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
    text_fr: "Gloire à Celui qui a mis ceci à notre service alors que nous n'étions pas capables de le dominer. Et c'est vers notre Seigneur que nous retournerons."
  },
  // GRATITUDE
  {
    id: 10,
    category_fr: "Gratitude",
    category_ar: "الشكر والحمد",
    title_fr: "Prière de reconnaissance",
    title_ar: "دعاء الشكر",
    text_ar: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ",
    text_fr: "Seigneur ! Inspire-moi pour que je rende grâce au bienfait dont Tu m'as comblé."
  },
  {
    id: 11,
    category_fr: "Prière",
    category_ar: "الصلاة",
    title_fr: "Après les ablutions",
    title_ar: "بعد الوضوء",
    text_ar: "أَشْهَدُ أَنْ لا إِلَهَ إِلا اللَّهُ وَحْدَهُ لا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
    text_fr: "J'atteste qu'il n'y a de divinité qu'Allah l'Unique, sans associé, et j'atteste que Muhammad est Son serviteur et Messager."
  }
];

export const LogoCrescent = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C10.6 2 9.25 2.23 8 2.64C10.74 3.91 12.61 6.64 12.61 9.8C12.61 13.9 9.3 17.21 5.2 17.21C4.05 17.21 2.97 16.94 2 16.48C3.17 19.74 6.31 22 10 22C14.42 22 18 18.42 18 14C18 10.31 15.74 7.17 12.48 6C12.16 4.7 12 3.37 12 2Z" />
  </svg>
);
