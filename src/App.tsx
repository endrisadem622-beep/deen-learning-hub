import React, { useState, useEffect } from "react";
import {
  BookOpen,
  GraduationCap,
  HandsPraying,
  ChatCircleDots,
  BookmarkSimple,
  Fire,
  ArrowRight,
  Plus,
  X,
  Check,
  CheckCircle,
  Sparkle,
  ArrowCounterClockwise,
  Copy,
  ThumbsUp,
  SealCheck,
  Student,
  Compass,
} from "@phosphor-icons/react";
import { Course, Lesson, Quiz, Dua, Post, NavTab, ThemeMode, Language, BookmarkItem } from "./types";
import { DICTIONARY, COURSES, SEERAH_TIMELINE, QUIZZES, SURAHS, HADITHS, DUAS, INITIAL_POSTS } from "./data/islamicData";
import { HeaderNav } from "./components/HeaderNav";
import { DhikrModal } from "./components/DhikrModal";

export function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => (localStorage.getItem("noor_theme") as ThemeMode) || "system");
  const [lang, setLang] = useState<Language>(() => (localStorage.getItem("noor_lang") as Language) || "en");
  const [activeTab, setActiveTab] = useState<NavTab>("home");
  const [streak] = useState<number>(() => parseInt(localStorage.getItem("noor_streak") || "7", 10));
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem("noor_completed") || '["aqeedah-1", "salah-1"]'); }
    catch { return ["aqeedah-1", "salah-1"]; }
  });

  const [quizScores, setQuizScores] = useState<Record<string, number>>(() => {
    try { return JSON.parse(localStorage.getItem("noor_scores") || '{"quiz-aqeedah": 100}'); }
    catch { return { "quiz-aqeedah": 100 }; }
  });

  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(() => {
    try { return JSON.parse(localStorage.getItem("noor_bms") || "[]"); }
    catch { return []; }
  });

  const [posts, setPosts] = useState<Post[]>(() => {
    try { return JSON.parse(localStorage.getItem("noor_posts") || "null") || INITIAL_POSTS; }
    catch { return INITIAL_POSTS; }
  });

  const [activeLesson, setActiveLesson] = useState<{ course: Course; lesson: Lesson } | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [activeDhikr, setActiveDhikr] = useState<Dua | null>(null);
  const [newPostModal, setNewPostModal] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [postCategory, setPostCategory] = useState("General Discussion");

  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [arabicSize, setArabicSize] = useState<"sm" | "base" | "lg" | "xl">("lg");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  useEffect(() => {
    localStorage.setItem("noor_theme", theme);
    const root = document.documentElement;
    if (theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => { localStorage.setItem("noor_lang", lang); }, [lang]);
  useEffect(() => { localStorage.setItem("noor_completed", JSON.stringify(completedLessons)); }, [completedLessons]);
  useEffect(() => { localStorage.setItem("noor_scores", JSON.stringify(quizScores)); }, [quizScores]);
  useEffect(() => { localStorage.setItem("noor_bms", JSON.stringify(bookmarks)); }, [bookmarks]);
  useEffect(() => { localStorage.setItem("noor_posts", JSON.stringify(posts)); }, [posts]);

  const d = DICTIONARY[lang];

  const toggleBookmark = (item: BookmarkItem) => {
    const exists = bookmarks.some((b) => b.id === item.id);
    if (exists) {
      setBookmarks(bookmarks.filter((b) => b.id !== item.id));
      showToast(lang === "am" ? "ከተቀመጡት ተሰርዟል" : "Removed from bookmarks");
    } else {
      setBookmarks([...bookmarks, item]);
      showToast(lang === "am" ? "በተሳካ ሁኔታ ተቀምጧል!" : "Saved to bookmarks!");
    }
  };

  const isBookmarked = (id: string) => bookmarks.some((b) => b.id === id);

  const toggleLesson = (id: string) => {
    setCompletedLessons(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    showToast(lang === "am" ? "የትምህርት ሂደት ተዘምኗል" : "Lesson status updated");
  };

  const startQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz); setCurrentQIdx(0); setSelectedOpt(null);
    setIsAnswerSubmitted(false); setQuizScore(0); setQuizDone(false);
  };

  const submitQuizAnswer = () => {
    if (selectedOpt === null || !activeQuiz) return;
    if (selectedOpt === activeQuiz.questions[currentQIdx].answer) setQuizScore(s => s + 1);
    setIsAnswerSubmitted(true);
  };

  const nextQuizQ = () => {
    if (!activeQuiz) return;
    if (currentQIdx + 1 < activeQuiz.questions.length) {
      setCurrentQIdx(i => i + 1); setSelectedOpt(null); setIsAnswerSubmitted(false);
    } else {
      setQuizDone(true);
      const total = activeQuiz.questions.length;
      const finalScore = Math.round(((quizScore + (selectedOpt === activeQuiz.questions[currentQIdx].answer ? 1 : 0)) / total) * 100);
      setQuizScores(prev => ({ ...prev, [activeQuiz.id]: finalScore }));
    }
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postBody.trim()) return;
    const newPost: Post = {
      id: `p-${Date.now()}`,
      author: lang === "am" ? "የተከበረ ተማሪ" : "Noor Seeker",
      initials: "NS",
      color: "from-amber-600 to-emerald-700",
      category: postCategory,
      title: postTitle.trim(),
      body: postBody.trim(),
      time: "Just now",
      likes: 1,
      replies: [],
    };
    setPosts([newPost, ...posts]);
    setPostTitle(""); setPostBody(""); setNewPostModal(false);
    showToast(lang === "am" ? "ውይይት ተጋርቷል!" : "Discussion shared!");
  };

  const filteredCourses = COURSES.filter(c => !searchQuery || c.title.en.toLowerCase().includes(searchQuery.toLowerCase()) || c.title.am.includes(searchQuery));
  const filteredSurahs = SURAHS.filter(s => !searchQuery || s.name.en.toLowerCase().includes(searchQuery.toLowerCase()) || s.name.am.includes(searchQuery));
  const filteredHadiths = HADITHS.filter(h => !searchQuery || h.en.toLowerCase().includes(searchQuery.toLowerCase()) || h.am.includes(searchQuery));
  const filteredDuas = DUAS.filter(u => !searchQuery || u.title.en.toLowerCase().includes(searchQuery.toLowerCase()) || u.title.am.includes(searchQuery));

  const fontClass = { sm: "text-lg", base: "text-xl", lg: "text-2xl sm:text-3xl", xl: "text-3xl sm:text-4xl" }[arabicSize];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-200">
      {toast && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 text-white shadow-xl animate-fade-in text-sm font-medium border border-emerald-600/40">
          <CheckCircle size={18} weight="fill" className="text-amber-400" />
          <span>{toast}</span>
        </div>
      )}

      <HeaderNav
        activeTab={activeTab} setActiveTab={setActiveTab}
        lang={lang} setLang={setLang}
        theme={theme} setTheme={setTheme}
        streak={streak} searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        bookmarksCount={bookmarks.length}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-12">
        {/* TAB: HOME */}
        {activeTab === "home" && (
          <div className="space-y-8 animate-fade-in">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-950 text-white p-6 sm:p-10 shadow-2xl border border-emerald-700/40">
              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-4">
                  <Sparkle size={14} weight="fill" />
                  <span>{lang === "am" ? "ትክክለኛ ኢስላማዊ እውቀት" : "Authentic Islamic Knowledge"}</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight leading-tight">{d.heroHeading}</h1>
                <p className="mt-3 sm:mt-4 text-emerald-100/90 text-sm sm:text-base leading-relaxed max-w-2xl font-light">{d.heroSub}</p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button onClick={() => setActiveTab("courses")} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-sm shadow-md transition-all active:scale-95">
                    <span>{d.startLearning}</span><ArrowRight size={16} weight="bold" />
                  </button>
                  <button onClick={() => setActiveTab("quran")} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 transition-colors">
                    <BookOpen size={16} /><span>{d.exploreQuran}</span>
                  </button>
                  <button onClick={() => setActiveDhikr(DUAS[0])} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-emerald-100 font-semibold text-sm border border-emerald-600/40 transition-colors">
                    <HandsPraying size={16} /><span>{lang === "am" ? "የእለቱ ዚክር" : "Daily Dhikr"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 rounded-2xl bg-card border border-border flex items-center gap-3">
                <div className="p-3 rounded-xl bg-emerald-600/10 text-emerald-700 dark:text-emerald-400"><GraduationCap size={24} weight="duotone" /></div>
                <div><div className="text-xl font-bold font-serif">{completedLessons.length}</div><div className="text-xs text-muted-foreground">{d.lessonsFinished}</div></div>
              </div>
              <div className="p-4 rounded-2xl bg-card border border-border flex items-center gap-3">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400"><SealCheck size={24} weight="duotone" /></div>
                <div><div className="text-xl font-bold font-serif">{Object.keys(quizScores).length}</div><div className="text-xs text-muted-foreground">{d.quizzesCompleted}</div></div>
              </div>
              <div className="p-4 rounded-2xl bg-card border border-border flex items-center gap-3">
                <div className="p-3 rounded-xl bg-red-500/10 text-red-600"><Fire size={24} weight="fill" /></div>
                <div><div className="text-xl font-bold font-serif">{streak} {lang === "am" ? "ቀናት" : "Days"}</div><div className="text-xs text-muted-foreground">{d.streakDays}</div></div>
              </div>
              <div className="p-4 rounded-2xl bg-card border border-border flex items-center gap-3">
                <div className="p-3 rounded-xl bg-teal-500/10 text-teal-600"><BookmarkSimple size={24} weight="duotone" /></div>
                <div><div className="text-xl font-bold font-serif">{bookmarks.length}</div><div className="text-xs text-muted-foreground">{d.bookmarks}</div></div>
              </div>
            </div>

            {/* Ayah & Hadith Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-2xl p-6 bg-card border border-border shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">{d.todayAyah}</span>
                  <span className="text-xs text-muted-foreground">{SURAHS[0].reference}</span>
                </div>
                <div className="py-4 text-center">
                  <p className="font-arabic text-xl sm:text-2xl leading-relaxed select-all">{SURAHS[0].ayah.split("۝")[0]} ۝ {SURAHS[0].ayah.split("۝")[1]} ۝</p>
                  <p className="mt-3 text-xs sm:text-sm text-muted-foreground">{SURAHS[0][lang]}</p>
                </div>
                <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                  <button onClick={() => setActiveTab("quran")} className="font-semibold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1">
                    <span>{d.exploreQuran}</span><ArrowRight size={14} />
                  </button>
                  <button onClick={() => toggleBookmark({ id: SURAHS[0].id, type: "ayah", title: SURAHS[0].name[lang], reference: SURAHS[0].reference })} className="p-1.5 rounded-lg border border-border text-muted-foreground">
                    <BookmarkSimple size={16} weight={isBookmarked(SURAHS[0].id) ? "fill" : "regular"} className={isBookmarked(SURAHS[0].id) ? "text-amber-500" : ""} />
                  </button>
                </div>
              </div>

              <div className="rounded-2xl p-6 bg-card border border-border shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">{d.todayHadith}</span>
                  <span className="text-xs text-muted-foreground">{HADITHS[0].source}</span>
                </div>
                <div className="py-4 text-center">
                  <p className="font-arabic text-lg sm:text-xl leading-relaxed select-all">{HADITHS[0].arabic}</p>
                  <p className="mt-3 text-xs sm:text-sm text-muted-foreground">{HADITHS[0][lang]}</p>
                  <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-400 font-serif">— {HADITHS[0].narrator[lang]}</p>
                </div>
                <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                  <button onClick={() => setActiveTab("quran")} className="font-semibold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1">
                    <span>{lang === "am" ? "ሐዲሶችን አንብብ" : "Read Hadiths"}</span><ArrowRight size={14} />
                  </button>
                  <button onClick={() => toggleBookmark({ id: HADITHS[0].id, type: "hadith", title: HADITHS[0].narrator[lang], reference: HADITHS[0].source })} className="p-1.5 rounded-lg border border-border text-muted-foreground">
                    <BookmarkSimple size={16} weight={isBookmarked(HADITHS[0].id) ? "fill" : "regular"} className={isBookmarked(HADITHS[0].id) ? "text-amber-500" : ""} />
                  </button>
                </div>
              </div>
            </div>

            {/* Habasha Heritage Banner */}
            <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-amber-500/10 via-emerald-600/10 to-transparent border border-amber-500/25">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300">{d.ethiopiaHighlight}</span>
              <h3 className="mt-3 text-xl sm:text-2xl font-serif font-bold text-foreground">
                {lang === "am" ? "የመጀመሪያው ሂጅራ እና የጻድቁ ንጉስ ነጋሺ (አስሐማ) ውለታ" : "First Migration to Habasha & Sanctuary of King an-Najashi"}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-3xl leading-relaxed">
                {lang === "am"
                  ? "ከመዲና ሂጅራ በፊት የነቢዩ ﷺ ሰሃቦች ወደ ሀበሻ ምድር ተሰደው በጻድቁ ንጉስ ነጋሺ ፍጹም ከለላና ፍቅር አግኝተዋል። ይህ ታሪካዊ ክስተት እስልምና በኢትዮጵያ ያለውን ጥልቅ መሰረት ይመሰክራል።"
                  : "Before Madinah, early Muslims migrated to Abyssinia (Ethiopia). King Ashama protected them, wept hearing Surah Maryam, and was prayed upon by the Prophet ﷺ."}
              </p>
              <button onClick={() => setActiveTab("courses")} className="mt-4 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5">
                <span>{lang === "am" ? "የሀበሻን ታሪክ አጥና" : "Study Habasha History"}</span><ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* TAB: COURSES */}
        {activeTab === "courses" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">{d.allCourses}</h1>
                <p className="text-xs sm:text-sm text-muted-foreground">{lang === "am" ? "ትክክለኛ ኢስላማዊ ሳይንሶች እና ፈተናዎች" : "Structured learning pathways with quizzes and verified curriculum"}</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-600/10 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
                <CheckCircle size={16} weight="fill" />
                <span>{completedLessons.length} {d.lessonsFinished}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((c) => {
                const finished = c.lessons.filter(l => completedLessons.includes(l.id)).length;
                const progress = Math.round((finished / c.lessons.length) * 100);
                const quiz = QUIZZES.find(q => q.courseId === c.id);
                return (
                  <div key={c.id} className="rounded-2xl p-6 bg-card border border-border shadow-xs hover:border-emerald-600/50 transition-all flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold mb-3">
                        <Compass size={22} weight="duotone" />
                      </div>
                      <h3 className="font-serif font-bold text-base text-foreground">{c.title[lang]}</h3>
                      <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">{c.desc[lang]}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-border space-y-3">
                      <div className="flex justify-between text-xs text-muted-foreground"><span>{c.lessons.length} {d.lessons}</span><span>{progress}%</span></div>
                      <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${progress}%` }} />
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button onClick={() => setActiveLesson({ course: c, lesson: c.lessons[0] })} className="py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-colors">
                          {d.viewLesson}
                        </button>
                        {quiz && (
                          <button onClick={() => startQuiz(quiz)} className="py-2 rounded-xl border border-border hover:bg-muted text-xs font-semibold">
                            {d.takeQuiz}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Seerah Timeline */}
            <div className="mt-12 rounded-3xl p-6 sm:p-8 bg-card border border-border shadow-xs">
              <h2 className="text-2xl font-serif font-bold text-foreground">{d.seerahTitle}</h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 mb-6">{d.seerahSub}</p>
              <div className="space-y-4">
                {SEERAH_TIMELINE.map((event) => (
                  <div key={event.id} className="p-4 rounded-xl bg-muted/30 border border-border/80 flex items-start justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-600/15 text-emerald-800 dark:text-emerald-300">{event.year}</span>
                      <h4 className="mt-1 font-serif font-bold text-base text-foreground">{event.title[lang]}</h4>
                      <p className="mt-1 text-xs sm:text-sm text-muted-foreground">{event.body[lang]}</p>
                    </div>
                    <button onClick={() => toggleBookmark({ id: event.id, type: "seerah", title: event.title[lang], reference: event.year })} className="p-1.5 text-muted-foreground hover:text-foreground">
                      <BookmarkSimple size={16} weight={isBookmarked(event.id) ? "fill" : "regular"} className={isBookmarked(event.id) ? "text-amber-500" : ""} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: QURAN & HADITH */}
        {activeTab === "quran" && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
              <div>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">{lang === "am" ? "ቁርኣን እና ሐዲስ" : "Qur’an & Hadith"}</h1>
                <p className="text-xs sm:text-sm text-muted-foreground">{lang === "am" ? "አያዎችን በዐረብኛ፣ በትርጉም እና በተፍሲር ያንብቡ" : "Sacred verses with authentic transliteration, translation, and tafsir"}</p>
              </div>
              <div className="flex items-center gap-1.5 border border-border rounded-xl p-1 bg-card">
                <span className="text-xs text-muted-foreground px-2">{d.arabicTextSize}:</span>
                {(["sm", "base", "lg", "xl"] as const).map(s => (
                  <button key={s} onClick={() => setArabicSize(s)} className={`px-2 py-0.5 text-xs font-bold rounded-lg ${arabicSize === s ? "bg-emerald-700 text-white" : "text-muted-foreground"}`}>
                    {s.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Surahs */}
            <div className="space-y-6">
              {filteredSurahs.map((surah) => (
                <div key={surah.id} className="rounded-3xl p-6 sm:p-8 bg-card border border-border shadow-xs">
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif font-bold text-lg text-foreground">{surah.name[lang]}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-600/10 text-emerald-700 dark:text-emerald-400 font-semibold">{surah.reference}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-arabic text-xl font-bold text-amber-600 dark:text-amber-400">{surah.arabicName}</span>
                      <button onClick={() => toggleBookmark({ id: surah.id, type: "ayah", title: surah.name[lang], reference: surah.reference })} className="p-1.5 rounded-lg border border-border text-muted-foreground">
                        <BookmarkSimple size={18} weight={isBookmarked(surah.id) ? "fill" : "regular"} className={isBookmarked(surah.id) ? "text-amber-500" : ""} />
                      </button>
                    </div>
                  </div>
                  <div className="py-6 text-center">
                    <p className={`font-arabic leading-loose text-foreground select-all ${fontClass}`}>{surah.ayah}</p>
                    <p className="mt-4 text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 font-serif italic max-w-3xl mx-auto">"{surah.translit}"</p>
                    <p className="mt-3 text-sm sm:text-base text-foreground/90 max-w-3xl mx-auto">{surah[lang]}</p>
                  </div>
                  <div className="mt-4 p-4 rounded-2xl bg-muted/40 border border-border/80 text-xs sm:text-sm">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400 mr-2">{lang === "am" ? "ተፍሲር፦" : "Tafsir:"}</span>
                    <span className="text-muted-foreground">{surah.tafsir[lang]}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Hadiths */}
            <div className="space-y-4 pt-6">
              <h2 className="text-xl font-serif font-bold text-foreground flex items-center gap-2">
                <SealCheck size={20} className="text-amber-600" /><span>{lang === "am" ? "የነቢዩ ﷺ ሶሒሕ ሐዲሶች" : "Authentic Hadith Collections"}</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredHadiths.map((h) => (
                  <div key={h.id} className="rounded-2xl p-6 bg-card border border-border shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-border text-xs">
                        <span className="font-serif font-bold text-emerald-700 dark:text-emerald-400">{h.narrator[lang]}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">{h.source}</span>
                          <button onClick={() => toggleBookmark({ id: h.id, type: "hadith", title: h.narrator[lang], reference: h.source })} className="p-1 text-muted-foreground">
                            <BookmarkSimple size={16} weight={isBookmarked(h.id) ? "fill" : "regular"} className={isBookmarked(h.id) ? "text-amber-500" : ""} />
                          </button>
                        </div>
                      </div>
                      <p className="font-arabic text-lg sm:text-xl leading-relaxed text-center my-4">{h.arabic}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{h[lang]}</p>
                    </div>
                    <div className="pt-3 border-t border-border flex items-center justify-between text-xs mt-4">
                      <button onClick={() => { navigator.clipboard.writeText(`${h.arabic}

${h[lang]}`); showToast(d.copied); }} className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
                        <Copy size={14} /><span>{d.copyDua}</span>
                      </button>
                      <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-600/10 px-2 py-0.5 rounded-full">Sahih</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: DHIKR & DUA */}
        {activeTab === "dhikr" && (
          <div className="space-y-6 animate-fade-in">
            <div className="pb-4 border-b border-border">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">{lang === "am" ? "ዱዓ እና ዚክር (ተስቢሕ)" : "Daily Supplications & Dhikr"}</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">{lang === "am" ? "የተመረጡ ዱዓዎችን በይነተገናኝ ተስቢሕ መቁጠሪያ ይዘክሩ" : "Authentic supplications with tactile interactive tasbeeh counter"}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDuas.map((dua) => (
                <div key={dua.id} className="rounded-2xl p-6 bg-card border border-border shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-border">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-600/10 text-emerald-700 dark:text-emerald-400">{dua.category[lang]}</span>
                      <button onClick={() => toggleBookmark({ id: dua.id, type: "dua", title: dua.title[lang], reference: `Target: ${dua.target}` })} className="p-1 text-muted-foreground">
                        <BookmarkSimple size={16} weight={isBookmarked(dua.id) ? "fill" : "regular"} className={isBookmarked(dua.id) ? "text-amber-500" : ""} />
                      </button>
                    </div>
                    <h3 className="font-serif font-bold text-base text-foreground mt-3">{dua.title[lang]}</h3>
                    <p className="font-arabic text-xl sm:text-2xl leading-relaxed text-center my-4 dir-rtl">{dua.arabic}</p>
                    <p className="text-xs text-emerald-800 dark:text-emerald-300 font-serif italic mb-2">"{dua.translit}"</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{dua[lang]}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-medium">{d.target}: <strong className="text-foreground">{dua.target}x</strong></span>
                    <button onClick={() => setActiveDhikr(dua)} className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-600 hover:from-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md">
                      <HandsPraying size={16} /><span>{d.dhikrCounter}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: COMMUNITY */}
        {activeTab === "community" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
              <div>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">{lang === "am" ? "የማህበረሰብ ውይይት መድረክ" : "Community Forum"}</h1>
                <p className="text-xs sm:text-sm text-muted-foreground">{d.beRespectful}</p>
              </div>
              <button onClick={() => setNewPostModal(true)} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-md">
                <Plus size={16} weight="bold" /><span>{d.newDiscussion}</span>
              </button>
            </div>

            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="rounded-2xl p-6 bg-card border border-border shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full bg-gradient-to-tr ${post.color} text-white font-bold text-xs flex items-center justify-center`}>{post.initials}</div>
                      <div><div className="font-bold text-sm text-foreground">{post.author}</div><div className="text-[11px] text-muted-foreground">{post.time}</div></div>
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-muted border border-border text-muted-foreground">{post.category}</span>
                  </div>
                  <div><h3 className="font-serif font-bold text-base text-foreground">{post.title}</h3><p className="mt-1 text-xs sm:text-sm text-foreground/90">{post.body}</p></div>
                  <div className="flex items-center gap-4 pt-3 border-t border-border text-xs text-muted-foreground">
                    <button onClick={() => setPosts(posts.map(p => p.id === post.id ? { ...p, likes: p.likes + 1 } : p))} className="flex items-center gap-1.5 hover:text-emerald-700 font-semibold">
                      <ThumbsUp size={16} /><span>{post.likes}</span>
                    </button>
                    <span className="flex items-center gap-1.5"><ChatCircleDots size={16} /><span>{post.replies.length} {d.replies}</span></span>
                  </div>
                  {post.replies.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-border/60">
                      {post.replies.map(r => (
                        <div key={r.id} className="p-3 rounded-xl bg-muted/40 text-xs">
                          <div className="flex justify-between font-bold text-foreground"><span>{r.author}</span><span className="text-[10px] text-muted-foreground font-normal">{r.time}</span></div>
                          <p className="text-muted-foreground mt-1">{r.body}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const input = e.currentTarget.elements.namedItem("rep") as HTMLInputElement;
                    if (input?.value.trim()) {
                      setPosts(posts.map(p => p.id === post.id ? { ...p, replies: [...p.replies, { id: `r-${Date.now()}`, author: lang === "am" ? "ተሳታፊ" : "Seeker", body: input.value.trim(), time: "Just now" }] } : p));
                      input.value = "";
                      showToast(lang === "am" ? "መልስ ተልኳል" : "Reply added");
                    }
                  }} className="flex items-center gap-2 pt-2">
                    <input name="rep" type="text" placeholder={lang === "am" ? "አስተያየት ይጻፉ..." : "Add a reflection..."} className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-1 focus:ring-emerald-600" />
                    <button type="submit" className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs">{d.reply}</button>
                  </form>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: PROFILE */}
        {activeTab === "profile" && (
          <div className="space-y-8 animate-fade-in">
            <div className="pb-4 border-b border-border">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">{lang === "am" ? "የእኔ እድገት እና የተቀመጡ" : "My Progress & Bookmarks"}</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">{lang === "am" ? "የተጠናቀቁ ትምህርቶች እና የተቀመጡ አያዎች" : "Track milestones and study saved verses"}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-card border border-border shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center font-bold"><Fire size={28} weight="fill" /></div>
                <div><h4 className="font-serif font-bold text-foreground">{lang === "am" ? "የጸና ተማሪ" : "Steadfast Seeker"}</h4><p className="text-xs text-muted-foreground">{streak} {d.streakDays}</p></div>
              </div>
              <div className="p-5 rounded-2xl bg-card border border-border shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-600/15 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold"><GraduationCap size={28} weight="duotone" /></div>
                <div><h4 className="font-serif font-bold text-foreground">{lang === "am" ? "የዕውቀት ፈላጊ" : "Knowledge Seeker"}</h4><p className="text-xs text-muted-foreground">{completedLessons.length} {d.lessonsFinished}</p></div>
              </div>
              <div className="p-5 rounded-2xl bg-card border border-border shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-600/15 text-teal-700 flex items-center justify-center font-bold"><SealCheck size={28} weight="duotone" /></div>
                <div><h4 className="font-serif font-bold text-foreground">{lang === "am" ? "የፈተና አሸናፊ" : "Quiz Master"}</h4><p className="text-xs text-muted-foreground">{Object.keys(quizScores).length} {d.quizzesCompleted}</p></div>
              </div>
            </div>

            <div className="rounded-3xl p-6 sm:p-8 bg-card border border-border shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <h3 className="font-serif font-bold text-lg text-foreground flex items-center gap-2">
                  <BookmarkSimple size={20} className="text-amber-500" /><span>{d.bookmarks} ({bookmarks.length})</span>
                </h3>
                {bookmarks.length > 0 && (
                  <button onClick={() => { setBookmarks([]); showToast(lang === "am" ? "ሁሉም ተሰርዘዋል" : "Cleared bookmarks"); }} className="text-xs text-muted-foreground hover:text-destructive">
                    {lang === "am" ? "ሁሉንም አጽዳ" : "Clear All"}
                  </button>
                )}
              </div>
              {bookmarks.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground text-xs sm:text-sm"><BookmarkSimple size={32} className="mx-auto mb-2 opacity-40" /><p>{d.noBookmarks}</p></div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {bookmarks.map(bm => (
                    <div key={bm.id} className="p-3.5 rounded-xl bg-muted/40 border border-border flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-600/10 px-1.5 py-0.5 rounded">{bm.type}</span>
                        <h4 className="font-serif font-bold text-sm text-foreground mt-1">{bm.title}</h4>
                        <p className="text-[11px] text-muted-foreground">{bm.reference}</p>
                      </div>
                      <button onClick={() => toggleBookmark(bm)} className="p-1 text-muted-foreground hover:text-destructive"><X size={16} /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* LESSON MODAL */}
      {activeLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl max-h-[85vh] rounded-3xl bg-card border border-border shadow-2xl p-6 sm:p-8 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">{activeLesson.course.title[lang]}</span>
                <h3 className="font-serif font-bold text-xl text-foreground mt-1">{activeLesson.lesson.title[lang]}</h3>
              </div>
              <button onClick={() => setActiveLesson(null)} className="p-2 rounded-xl border border-border"><X size={18} /></button>
            </div>
            {activeLesson.lesson.arabic && (
              <div className="p-6 rounded-2xl bg-emerald-950/10 dark:bg-emerald-900/20 border border-emerald-600/20 text-center">
                <p className="font-arabic text-2xl leading-relaxed select-all">{activeLesson.lesson.arabic}</p>
              </div>
            )}
            <p className="text-sm sm:text-base leading-relaxed text-foreground/90">{activeLesson.lesson.body[lang]}</p>
            <div className="pt-4 border-t border-border flex items-center justify-between">
              <button onClick={() => toggleLesson(activeLesson.lesson.id)} className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm ${completedLessons.includes(activeLesson.lesson.id) ? "bg-emerald-700 text-white" : "border border-border"}`}>
                <Check size={18} weight="bold" /><span>{completedLessons.includes(activeLesson.lesson.id) ? (lang === "am" ? "ተጠናቋል ✓" : "Completed ✓") : (lang === "am" ? "እንደ ተጠናቀቀ ምልክት አድርግ" : "Mark as Completed")}</span>
              </button>
              <button onClick={() => setActiveLesson(null)} className="px-4 py-2 rounded-xl bg-muted text-xs sm:text-sm font-semibold">{d.cancel}</button>
            </div>
          </div>
        </div>
      )}

      {/* QUIZ MODAL */}
      {activeQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl rounded-3xl bg-card border border-border shadow-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600">{d.quizTitle}</span>
                <h3 className="font-serif font-bold text-lg text-foreground mt-0.5">{activeQuiz.title[lang]}</h3>
              </div>
              <button onClick={() => setActiveQuiz(null)} className="p-2 rounded-xl border border-border"><X size={18} /></button>
            </div>
            {!quizDone ? (
              <div className="py-6 space-y-5">
                <div className="flex justify-between text-xs text-muted-foreground font-semibold">
                  <span>{lang === "am" ? "ጥያቄ" : "Question"} {currentQIdx + 1} / {activeQuiz.questions.length}</span>
                </div>
                <h4 className="font-serif font-bold text-base text-foreground">{activeQuiz.questions[currentQIdx].q[lang]}</h4>
                <div className="space-y-2">
                  {activeQuiz.questions[currentQIdx].options.map((opt, idx) => {
                    const isSelected = selectedOpt === idx;
                    const isCorrect = idx === activeQuiz.questions[currentQIdx].answer;
                    let style = "border-border bg-card text-foreground";
                    if (isAnswerSubmitted) {
                      style = isCorrect ? "bg-emerald-600/15 border-emerald-600 text-emerald-800 dark:text-emerald-300 font-bold" : (isSelected ? "bg-red-500/15 border-red-500 text-red-700" : "border-border text-muted-foreground");
                    } else if (isSelected) {
                      style = "border-amber-500 bg-amber-500/10 text-amber-700 font-semibold";
                    }
                    return (
                      <button key={idx} disabled={isAnswerSubmitted} onClick={() => setSelectedOpt(idx)} className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm flex justify-between ${style}`}>
                        <span>{opt[lang]}</span>
                        {isAnswerSubmitted && isCorrect && <Check size={16} className="text-emerald-600" />}
                      </button>
                    );
                  })}
                </div>
                {isAnswerSubmitted && (
                  <div className="p-3.5 rounded-xl bg-muted/50 border border-border text-xs leading-relaxed">
                    <span className="font-bold text-emerald-700 mr-1">{lang === "am" ? "ማብራሪያ፦" : "Explanation:"}</span>
                    <span className="text-muted-foreground">{activeQuiz.questions[currentQIdx].explain[lang]}</span>
                  </div>
                )}
                <div className="pt-2 flex justify-end">
                  {!isAnswerSubmitted ? (
                    <button disabled={selectedOpt === null} onClick={submitQuizAnswer} className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-xs disabled:opacity-40 shadow-md">
                      {lang === "am" ? "መልስ አረጋግጥ" : "Check Answer"}
                    </button>
                  ) : (
                    <button onClick={nextQuizQ} className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-md">
                      {currentQIdx + 1 < activeQuiz.questions.length ? (lang === "am" ? "ቀጣይ ጥያቄ →" : "Next Question →") : (lang === "am" ? "ውጤት ተመልከት" : "View Results")}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-600/15 text-emerald-700 mx-auto flex items-center justify-center font-bold"><SealCheck size={36} weight="fill" /></div>
                <h4 className="font-serif font-bold text-2xl text-foreground">{d.passed}</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">{d.score}: <strong className="text-foreground text-lg">{Math.round((quizScore / activeQuiz.questions.length) * 100)}%</strong></p>
                <div className="pt-4 flex justify-center gap-3">
                  <button onClick={() => startQuiz(activeQuiz)} className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border text-xs font-semibold">
                    <ArrowCounterClockwise size={16} /><span>{d.restartQuiz}</span>
                  </button>
                  <button onClick={() => setActiveQuiz(null)} className="px-5 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs">
                    {lang === "am" ? "ዝጋ" : "Close"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* DHIKR MODAL */}
      <DhikrModal dua={activeDhikr} onClose={() => setActiveDhikr(null)} lang={lang} />

      {/* NEW POST MODAL */}
      {newPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-card border border-border shadow-2xl p-6 sm:p-8">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <h3 className="font-serif font-bold text-lg text-foreground">{d.newDiscussion}</h3>
              <button onClick={() => setNewPostModal(false)} className="p-1.5 text-muted-foreground"><X size={18} /></button>
            </div>
            <form onSubmit={handlePostSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">{d.postCategory}</label>
                <select value={postCategory} onChange={(e) => setPostCategory(e.target.value)} className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-muted/30 text-foreground">
                  <option value="General Discussion">General Discussion</option>
                  <option value="Habasha History">Habasha (Ethiopia) History</option>
                  <option value="Daily Devotion">Daily Devotion</option>
                  <option value="Fiqh & Practice">Fiqh & Practice</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">{d.postTitle}</label>
                <input required type="text" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} placeholder="Topic..." className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-muted/30 text-foreground" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">{d.postBody}</label>
                <textarea required rows={4} value={postBody} onChange={(e) => setPostBody(e.target.value)} placeholder="Reflection..." className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-muted/30 text-foreground" />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setNewPostModal(false)} className="px-4 py-2 rounded-xl border border-border text-xs">{d.cancel}</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs">{d.publish}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;