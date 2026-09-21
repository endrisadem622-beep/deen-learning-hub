import React, { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  SpeakerSimpleHigh,
  Sparkle,
  BookmarkSimple,
  GraduationCap,
  Trophy,
  HandsPraying,
  Check,
  Copy,
  Heart,
} from "@phosphor-icons/react";
import { Tab, Lang, BookmarkItem } from "../types";
import { DICTIONARY, SURAHS, HADITHS, COURSES } from "../data/islamicData";

interface HeroAndDailyProps {
  lang: Lang;
  setActiveTab: (tab: Tab) => void;
  bookmarks: BookmarkItem[];
  toggleBookmark: (item: BookmarkItem) => void;
  completedLessonsCount: number;
  completedQuizzesCount: number;
}

export const HeroAndDaily: React.FC<HeroAndDailyProps> = ({
  lang,
  setActiveTab,
  bookmarks,
  toggleBookmark,
  completedLessonsCount,
  completedQuizzesCount,
}) => {
  const t = DICTIONARY[lang];
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedAyah, setCopiedAyah] = useState(false);
  const [copiedHadith, setCopiedHadith] = useState(false);

  const featuredAyah = SURAHS[1]; // Ayat al-Kursi
  const featuredHadith = HADITHS[0]; // Sincerity of Intention

  const isAyahBookmarked = bookmarks.some((b) => b.id === featuredAyah.id);
  const isHadithBookmarked = bookmarks.some((b) => b.id === featuredHadith.id);

  const handlePlayRecitation = () => {
    setIsPlayingAudio(true);
    // Simulate audio playback timing
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 4000);
  };

  const handleCopyAyah = () => {
    const textToCopy = `${featuredAyah.arabicName}
${featuredAyah.ayah}

${featuredAyah[lang]}
Ref: ${featuredAyah.reference}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedAyah(true);
    setTimeout(() => setCopiedAyah(false), 2000);
  };

  const handleCopyHadith = () => {
    const textToCopy = `${featuredHadith.arabic}

"${featuredHadith[lang]}"
— ${featuredHadith.narrator[lang]} (${featuredHadith.source})`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedHadith(true);
    setTimeout(() => setCopiedHadith(false), 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner with Islamic Geometry Pattern Overlay */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white p-6 sm:p-10 lg:p-12 shadow-2xl border border-emerald-800/40">
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-semibold backdrop-blur-xs">
            <Sparkle size={15} weight="fill" className="text-amber-400" />
            <span>{lang === "en" ? "Authentic Islamic Education & Community" : "ትክክለኛ ኢስላማዊ ትምህርት እና ማህበረሰብ"}</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white leading-tight">
            {t.heroHeading}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-2xl">
            {t.heroSub}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab("learn")}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-sm shadow-lg shadow-amber-950/20 transition-all hover:scale-[1.02] active:scale-95"
            >
              <GraduationCap size={18} weight="fill" />
              <span>{t.startLearning}</span>
              <ArrowRight size={16} weight="bold" />
            </button>

            <button
              onClick={() => setActiveTab("quran")}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-800/60 hover:bg-emerald-800/90 text-white font-medium text-sm border border-emerald-700/50 backdrop-blur-xs transition-all hover:scale-[1.02] active:scale-95"
            >
              <BookOpen size={18} />
              <span>{t.exploreQuran}</span>
            </button>

            <button
              onClick={() => setActiveTab("dua")}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white/90 font-medium text-sm backdrop-blur-xs transition-all hover:scale-[1.02] active:scale-95"
            >
              <HandsPraying size={18} />
              <span>{t.navDua}</span>
            </button>
          </div>

          {/* Progress Mini Highlights */}
          <div className="pt-4 grid grid-cols-3 gap-3 border-t border-emerald-800/60 max-w-lg text-emerald-200">
            <div>
              <p className="text-xs text-emerald-300/80">{t.lessonsFinished}</p>
              <p className="text-xl font-bold text-white mt-0.5">{completedLessonsCount}</p>
            </div>
            <div>
              <p className="text-xs text-emerald-300/80">{t.quizzesCompleted}</p>
              <p className="text-xl font-bold text-white mt-0.5">{completedQuizzesCount}</p>
            </div>
            <div>
              <p className="text-xs text-emerald-300/80">{t.bookmarks}</p>
              <p className="text-xl font-bold text-white mt-0.5">{bookmarks.length}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Reminders Section (Ayah + Hadith) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Ayah Card */}
        <div className="rounded-2xl bg-card border border-border p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                <h2 className="font-serif font-bold text-base text-foreground">{t.todayAyah}</h2>
              </div>
              <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                {featuredAyah.reference}
              </span>
            </div>

            {/* Arabic Recitation Snippet */}
            <div className="p-4 rounded-xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/15">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                  {featuredAyah.name[lang]}
                </span>
                <span className="font-arabic text-sm text-emerald-800 dark:text-emerald-200 font-bold">
                  {featuredAyah.arabicName}
                </span>
              </div>
              <p className="font-arabic text-xl sm:text-2xl text-right leading-loose text-foreground py-2 select-text dir-rtl">
                {featuredAyah.ayah}
              </p>
            </div>

            {/* Translation in Active Language */}
            <div className="space-y-2">
              <p className="text-sm text-foreground/90 leading-relaxed font-sans italic">
                "{featuredAyah[lang]}"
              </p>
              {featuredAyah.tafsir && (
                <p className="text-xs text-muted-foreground border-l-2 border-primary/40 pl-3 py-0.5">
                  <span className="font-semibold text-foreground">Tafsir: </span>
                  {featuredAyah.tafsir[lang]}
                </p>
              )}
            </div>
          </div>

          {/* Ayah Actions */}
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-border">
            <button
              onClick={handlePlayRecitation}
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${
                isPlayingAudio
                  ? "bg-primary text-primary-foreground border-primary animate-pulse"
                  : "bg-muted text-foreground border-border hover:bg-muted/80"
              }`}
            >
              <SpeakerSimpleHigh size={15} />
              <span>{isPlayingAudio ? (lang === "en" ? "Reciting..." : "እየተቀራ ነው...") : (lang === "en" ? "Listen" : "አዳምጥ")}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyAyah}
                title={t.copyDua}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                {copiedAyah ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
              </button>

              <button
                onClick={() =>
                  toggleBookmark({
                    id: featuredAyah.id,
                    type: "ayah",
                    title: featuredAyah.name[lang],
                    snippet: featuredAyah.ayah.slice(0, 60) + "...",
                  })
                }
                title={isAyahBookmarked ? "Remove Bookmark" : "Save Bookmark"}
                className={`p-2 rounded-lg transition-colors ${
                  isAyahBookmarked
                    ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <BookmarkSimple size={16} weight={isAyahBookmarked ? "fill" : "regular"} />
              </button>
            </div>
          </div>
        </div>

        {/* Daily Hadith Card */}
        <div className="rounded-2xl bg-card border border-border p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <h2 className="font-serif font-bold text-base text-foreground">{t.todayHadith}</h2>
              </div>
              <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                Sahih
              </span>
            </div>

            {/* Arabic Hadith */}
            <div className="p-4 rounded-xl bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/15">
              <p className="font-arabic text-lg sm:text-xl text-right leading-loose text-foreground py-1 select-text dir-rtl">
                {featuredHadith.arabic}
              </p>
            </div>

            {/* Translation & Narrator */}
            <div className="space-y-2">
              <p className="text-sm text-foreground/90 leading-relaxed font-sans">
                "{featuredHadith[lang]}"
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-muted-foreground gap-1 pt-1">
                <p>
                  <span className="font-semibold text-foreground">{lang === "en" ? "Narrator: " : "አስተላላፊ: "}</span>
                  {featuredHadith.narrator[lang]}
                </p>
                <span className="italic">{featuredHadith.source}</span>
              </div>
            </div>
          </div>

          {/* Hadith Actions */}
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-border">
            <span className="text-xs text-muted-foreground">
              {lang === "en" ? "Hadith on Sincerity" : "የኒያህና የቅንነት ሐዲስ"}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyHadith}
                title={t.copyDua}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                {copiedHadith ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
              </button>

              <button
                onClick={() =>
                  toggleBookmark({
                    id: featuredHadith.id,
                    type: "hadith",
                    title: lang === "en" ? "Hadith on Intentions" : "የኒያህ ሐዲስ",
                    snippet: featuredHadith.arabic,
                  })
                }
                title={isHadithBookmarked ? "Remove Bookmark" : "Save Bookmark"}
                className={`p-2 rounded-lg transition-colors ${
                  isHadithBookmarked
                    ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <BookmarkSimple size={16} weight={isHadithBookmarked ? "fill" : "regular"} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Learning Pathways Overview */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-serif font-bold text-foreground">{t.allCourses}</h2>
            <p className="text-xs text-muted-foreground">
              {lang === "en" ? "Explore authentic curriculum with step-by-step guidance" : "ደረጃ በደረጃ የተዘጋጁ ትምህርቶችን ይከታተሉ"}
            </p>
          </div>
          <button
            onClick={() => setActiveTab("learn")}
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
          >
            <span>{lang === "en" ? "View all 9 tracks" : "ሁሉንም 9 ኮርሶች ተመልከት"}</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {COURSES.slice(0, 3).map((course) => (
            <div
              key={course.id}
              onClick={() => setActiveTab("learn")}
              className="group cursor-pointer rounded-2xl bg-card border border-border p-5 hover:border-primary/50 hover:shadow-md transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                  {course.id === "aqeedah" ? <Sparkle size={20} /> : course.id === "salah" ? <HandsPraying size={20} /> : <BookOpen size={20} />}
                </div>
                <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  {course.lessons.length} {t.lessons}
                </span>
              </div>
              <div>
                <h3 className="font-serif font-semibold text-base text-foreground group-hover:text-primary transition-colors">
                  {course.title[lang]}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                  {course.desc[lang]}
                </p>
              </div>
              <div className="pt-2 flex items-center text-xs font-medium text-primary gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>{t.viewLesson}</span>
                <ArrowRight size={12} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
