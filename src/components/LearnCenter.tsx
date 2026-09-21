import React, { useState } from "react";
import {
  GraduationCap,
  BookOpen,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Sparkle,
  Trophy,
  SealCheck,
  BookmarkSimple,
  X,
  Student,
  MoonStars,
  Heart,
  HandsPraying,
} from "@phosphor-icons/react";
import { Lang, Course, Lesson, Quiz, BookmarkItem } from "../types";
import { COURSES, QUIZZES, SEERAH_TIMELINE, DICTIONARY } from "../data/islamicData";

interface LearnCenterProps {
  lang: Lang;
  completedLessons: string[];
  toggleLessonCompleted: (lessonId: string) => void;
  quizScores: Record<string, number>;
  saveQuizScore: (quizId: string, score: number) => void;
  bookmarks: BookmarkItem[];
  toggleBookmark: (item: BookmarkItem) => void;
}

export const LearnCenter: React.FC<LearnCenterProps> = ({
  lang,
  completedLessons,
  toggleLessonCompleted,
  quizScores,
  saveQuizScore,
  bookmarks,
  toggleBookmark,
}) => {
  const t = DICTIONARY[lang];

  // Active track state
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [arabicFontSize, setArabicFontSize] = useState<"md" | "lg" | "xl">("lg");
  const [showTimeline, setShowTimeline] = useState(false);

  // Active quiz state
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Category filter
  const [filterCategory, setFilterCategory] = useState<"all" | "foundations" | "worship" | "character">("all");

  const getCourseIcon = (id: string) => {
    switch (id) {
      case "aqeedah":
        return <Sparkle size={22} className="text-amber-500" />;
      case "salah":
        return <HandsPraying size={22} className="text-emerald-500" />;
      case "seerah":
        return <GraduationCap size={22} className="text-teal-500" />;
      case "fiqh":
        return <Student size={22} className="text-blue-500" />;
      case "sawm":
        return <MoonStars size={22} className="text-indigo-500" />;
      case "zakat":
        return <Heart size={22} className="text-rose-500" />;
      case "akhlaq":
        return <Sparkle size={22} className="text-emerald-500" />;
      case "hadith":
        return <SealCheck size={22} className="text-amber-600" />;
      default:
        return <BookOpen size={22} className="text-emerald-500" />;
    }
  };

  const filteredCourses = COURSES.filter((course) => {
    if (filterCategory === "foundations") return ["aqeedah", "quran", "hadith"].includes(course.id);
    if (filterCategory === "worship") return ["salah", "sawm", "zakat"].includes(course.id);
    if (filterCategory === "character") return ["akhlaq", "seerah", "fiqh"].includes(course.id);
    return true;
  });

  const openCourse = (course: Course) => {
    setSelectedCourse(course);
    setActiveLesson(course.lessons[0] || null);
  };

  const openQuiz = (courseId: string) => {
    const quiz = QUIZZES.find((q) => q.courseId === courseId);
    if (quiz) {
      setActiveQuiz(quiz);
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setQuizSubmitted(false);
    }
  };

  const handleSelectQuizAnswer = (questionIndex: number, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const submitQuiz = () => {
    if (!activeQuiz) return;
    let score = 0;
    activeQuiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.answer) {
        score += 1;
      }
    });
    setQuizSubmitted(true);
    saveQuizScore(activeQuiz.id, score);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizSubmitted(false);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header & Seerah Timeline Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
            {t.allCourses}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            {lang === "en"
              ? "Comprehensive learning pathways spanning theology, practice, and the prophetic biography."
              : "የተሟሉ የትምህርት መስመሮች በአቂዳ፣ በአምልኮ ተግባራትና በነብዩ ﷺ ታሪክ ዙሪያ።"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTimeline(!showTimeline)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
              showTimeline
                ? "bg-primary text-primary-foreground border-primary shadow-xs"
                : "bg-card text-foreground border-border hover:bg-muted"
            }`}
          >
            <Sparkle size={15} weight="fill" className="text-amber-400" />
            <span>{showTimeline ? (lang === "en" ? "Show Tracks" : "ትምህርቶችን አሳይ") : t.seerahHighlight}</span>
          </button>
        </div>
      </div>

      {/* Seerah Timeline View (Chronological History with Ethiopia spotlight) */}
      {showTimeline ? (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3">
            <Sparkle size={22} weight="fill" className="text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-foreground font-serif">
                {lang === "en" ? "Historic Habasha Sanctuary in Islam" : "የሀበሻ ምድር በኢስላም ታሪክ ውስጥ ያለው የላቀ ክብር"}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {lang === "en"
                  ? "Ethiopia (Habasha) was the first sanctuary where the early Muslims found safety under King An-Najashi (Armah), who protected them and embraced pure monotheism."
                  : "ሀበሻ የመጀመሪያዎቹ ሙስሊሞች መከራ ሲደርስባቸው ፍትሀዊው ንጉስ ነጃሺ (አስሀማ) ፍጹም ከለላ የሰጣቸው እና ኢስላምን የተቀበለበት ታላቅ ታሪካዊ ምድር ናት።"}
              </p>
            </div>
          </div>

          <div className="relative pl-6 sm:pl-8 border-l-2 border-primary/30 space-y-8">
            {SEERAH_TIMELINE.map((event, index) => (
              <div key={event.id} className="relative group">
                {/* Timeline node */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-background border-4 border-primary group-hover:scale-125 transition-transform" />

                <div className="bg-card border border-border p-5 rounded-2xl shadow-xs space-y-2 hover:border-primary/40 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                      {event.year}
                    </span>
                    {index === 1 && (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400">
                        {lang === "en" ? "Ethiopia Link" : "የኢትዮጵያ ታሪክ"}
                      </span>
                    )}
                  </div>
                  <h4 className="font-serif font-bold text-base text-foreground">
                    {event.title[lang]}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {event.body[lang]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Regular Course Pathways */
        <div className="space-y-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: lang === "en" ? "All Tracks" : "ሁሉም" },
              { id: "foundations", label: lang === "en" ? "Theology & Revelation" : "አቂዳና መገለጥ" },
              { id: "worship", label: lang === "en" ? "Acts of Worship" : "የአምልኮ ተግባራት" },
              { id: "character", label: lang === "en" ? "Ethics & Prophetic History" : "ስነ-ምግባርና ሲራ" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filterCategory === cat.id
                    ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCourses.map((course) => {
              const quiz = QUIZZES.find((q) => q.courseId === course.id);
              const score = quiz ? quizScores[quiz.id] : undefined;
              const completedInCourse = course.lessons.filter((l) =>
                completedLessons.includes(l.id)
              ).length;
              const percent = Math.round((completedInCourse / course.lessons.length) * 100);

              return (
                <div
                  key={course.id}
                  className="rounded-2xl bg-card border border-border p-5 flex flex-col justify-between hover:border-primary/50 hover:shadow-md transition-all space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-xl bg-muted/80 ring-1 ring-border">
                        {getCourseIcon(course.id)}
                      </div>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        {completedInCourse}/{course.lessons.length} {t.lessons}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif font-bold text-lg text-foreground">
                        {course.title[lang]}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
                        {course.desc[lang]}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                        <span>{percent === 100 ? t.completed : t.inProgress}</span>
                        <span className="font-semibold">{percent}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions: Start Lessons & Take Quiz */}
                  <div className="flex items-center gap-2 pt-2 border-t border-border">
                    <button
                      onClick={() => openCourse(course)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-primary text-primary-foreground font-semibold text-xs shadow-xs hover:bg-primary/90 transition-all active:scale-95"
                    >
                      <BookOpen size={14} />
                      <span>{t.viewLesson}</span>
                    </button>

                    {quiz && (
                      <button
                        onClick={() => openQuiz(course.id)}
                        className={`inline-flex items-center justify-center gap-1 py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                          score !== undefined
                            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
                            : "bg-muted text-foreground border-border hover:bg-muted/80"
                        }`}
                        title={t.takeQuiz}
                      >
                        <Trophy size={14} />
                        <span>{score !== undefined ? `${score}/${quiz.questions.length}` : t.quizTitle}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Course Lesson Detail Modal / Viewer */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
          <div className="bg-card w-full max-w-4xl max-h-[90vh] rounded-3xl border border-border shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-border flex items-center justify-between bg-muted/40">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  {getCourseIcon(selectedCourse.id)}
                </div>
                <div>
                  <h2 className="font-serif font-bold text-lg text-foreground">
                    {selectedCourse.title[lang]}
                  </h2>
                  <p className="text-xs text-muted-foreground">{selectedCourse.desc[lang]}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Font Size Selector */}
                <div className="hidden xs:flex items-center bg-muted p-1 rounded-lg text-xs gap-1">
                  {(["md", "lg", "xl"] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => setArabicFontSize(size)}
                      className={`px-2 py-0.5 rounded font-mono ${
                        arabicFontSize === size ? "bg-card text-foreground shadow-xs font-bold" : "text-muted-foreground"
                      }`}
                    >
                      A{size === "md" ? "-" : size === "xl" ? "+" : ""}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedCourse(null)}
                  className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Body: Sidebar lesson list + Content reader */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {/* Lesson Nav List */}
              <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-border p-3 space-y-1 overflow-y-auto max-h-48 md:max-h-none bg-muted/20 shrink-0">
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider px-2 py-1">
                  {t.lessons} ({selectedCourse.lessons.length})
                </p>
                {selectedCourse.lessons.map((lesson, idx) => {
                  const isDone = completedLessons.includes(lesson.id);
                  const isSelected = activeLesson?.id === lesson.id;
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => setActiveLesson(lesson)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between gap-2 transition-all ${
                        isSelected
                          ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      <span className="truncate">
                        {idx + 1}. {lesson.title[lang]}
                      </span>
                      {isDone && (
                        <CheckCircle size={15} weight="fill" className={isSelected ? "text-primary-foreground" : "text-emerald-500"} />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Lesson Reader Content */}
              {activeLesson ? (
                <div className="flex-1 p-5 sm:p-8 overflow-y-auto space-y-6">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="font-serif font-bold text-xl text-foreground">
                      {activeLesson.title[lang]}
                    </h3>
                    <button
                      onClick={() =>
                        toggleBookmark({
                          id: activeLesson.id,
                          type: "lesson",
                          title: activeLesson.title[lang],
                          snippet: activeLesson.body[lang].slice(0, 70) + "...",
                        })
                      }
                      className={`p-2 rounded-lg border transition-colors ${
                        bookmarks.some((b) => b.id === activeLesson.id)
                          ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30"
                          : "bg-muted text-muted-foreground hover:text-foreground border-border"
                      }`}
                      title={t.bookmarks}
                    >
                      <BookmarkSimple
                        size={16}
                        weight={bookmarks.some((b) => b.id === activeLesson.id) ? "fill" : "regular"}
                      />
                    </button>
                  </div>

                  {/* Arabic Text Highlight if present */}
                  {activeLesson.arabic && (
                    <div className="p-5 rounded-2xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20 text-right dir-rtl">
                      <p
                        className={`font-arabic text-foreground font-bold leading-loose ${
                          arabicFontSize === "md" ? "text-xl" : arabicFontSize === "lg" ? "text-2xl" : "text-3xl"
                        }`}
                      >
                        {activeLesson.arabic}
                      </p>
                    </div>
                  )}

                  {/* Lesson Explanation */}
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-sm sm:text-base text-foreground/90 leading-relaxed font-sans">
                      {activeLesson.body[lang]}
                    </p>
                  </div>

                  {/* Lesson Footer Actions */}
                  <div className="pt-6 border-t border-border flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={() => toggleLessonCompleted(activeLesson.id)}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                        completedLessons.includes(activeLesson.id)
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                          : "bg-muted text-foreground border-border hover:bg-muted/80"
                      }`}
                    >
                      <CheckCircle size={16} weight={completedLessons.includes(activeLesson.id) ? "fill" : "regular"} />
                      <span>
                        {completedLessons.includes(activeLesson.id) ? t.completed : t.markLessonCompleted}
                      </span>
                    </button>

                    {QUIZZES.find((q) => q.courseId === selectedCourse.id) && (
                      <button
                        onClick={() => {
                          setSelectedCourse(null);
                          openQuiz(selectedCourse.id);
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 text-stone-950 text-xs font-bold hover:bg-amber-400 transition-all shadow-xs"
                      >
                        <Trophy size={16} weight="fill" />
                        <span>{t.takeQuiz}</span>
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex-1 p-8 flex items-center justify-center text-muted-foreground text-sm">
                  {lang === "en" ? "Select a lesson to begin reading" : "ትምህርት ለመጀመር ከመረጡት ውስጥ ይምረጡ"}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      {activeQuiz && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
          <div className="bg-card w-full max-w-xl rounded-3xl border border-border shadow-2xl overflow-hidden p-6 space-y-6 animate-in zoom-in-95 duration-200">
            {/* Quiz Header */}
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Trophy size={20} className="text-amber-500" />
                <h3 className="font-serif font-bold text-lg text-foreground">
                  {activeQuiz.title[lang]}
                </h3>
              </div>
              <button
                onClick={() => setActiveQuiz(null)}
                className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            {/* Quiz Progress */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {lang === "en" ? "Question" : "ጥያቄ"} {currentQuestionIndex + 1} of {activeQuiz.questions.length}
              </span>
              <span>
                {Object.keys(selectedAnswers).length} {lang === "en" ? "answered" : "ተመልሰዋል"}
              </span>
            </div>

            {/* Current Question Body */}
            {(() => {
              const currentQ = activeQuiz.questions[currentQuestionIndex];
              const userAnswer = selectedAnswers[currentQuestionIndex];

              return (
                <div className="space-y-4">
                  <h4 className="font-serif font-semibold text-base text-foreground leading-snug">
                    {currentQ.q[lang]}
                  </h4>

                  {/* Options List */}
                  <div className="space-y-2">
                    {currentQ.options.map((option, optIdx) => {
                      const isSelected = userAnswer === optIdx;
                      const isCorrect = currentQ.answer === optIdx;

                      let btnStyle = "bg-card border-border hover:bg-muted/70 text-foreground";
                      if (quizSubmitted) {
                        if (isCorrect) {
                          btnStyle = "bg-emerald-500/15 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-semibold";
                        } else if (isSelected && !isCorrect) {
                          btnStyle = "bg-rose-500/15 border-rose-500 text-rose-800 dark:text-rose-300";
                        }
                      } else if (isSelected) {
                        btnStyle = "bg-primary text-primary-foreground border-primary font-semibold shadow-xs";
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={quizSubmitted}
                          onClick={() => handleSelectQuizAnswer(currentQuestionIndex, optIdx)}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{option[lang]}</span>
                          {quizSubmitted && isCorrect && <CheckCircle size={16} weight="fill" className="text-emerald-500" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation after submission */}
                  {quizSubmitted && (
                    <div className="p-3.5 rounded-xl bg-muted/60 border border-border text-xs text-muted-foreground space-y-1">
                      <span className="font-semibold text-foreground">
                        {lang === "en" ? "Explanation: " : "ማብራሪያ፦ "}
                      </span>
                      <span>{currentQ.explain[lang]}</span>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Navigation & Submit Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground disabled:opacity-40"
              >
                <ArrowLeft size={14} />
                <span>{lang === "en" ? "Previous" : "ወደ ኋላ"}</span>
              </button>

              {currentQuestionIndex < activeQuiz.questions.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-muted text-foreground text-xs font-semibold hover:bg-muted/80"
                >
                  <span>{lang === "en" ? "Next" : "ቀጣይ"}</span>
                  <ArrowRight size={14} />
                </button>
              ) : !quizSubmitted ? (
                <button
                  onClick={submitQuiz}
                  className="inline-flex items-center gap-1 px-5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-md hover:bg-primary/90"
                >
                  <SealCheck size={16} weight="fill" />
                  <span>{t.submitQuiz}</span>
                </button>
              ) : (
                <button
                  onClick={resetQuiz}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-amber-500 text-stone-950 text-xs font-bold hover:bg-amber-400"
                >
                  <span>{t.retakeQuiz}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
