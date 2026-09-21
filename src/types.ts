import { createContext, useContext } from "react";

export type Lang = "en" | "am";
export type Language = "en" | "am";
export type ThemeMode = "light" | "dark" | "system";
export type NavTab = "home" | "courses" | "quran" | "dhikr" | "community" | "profile";
export type Tab =
  | "home"
  | "learn"
  | "quran"
  | "dua"
  | "community"
  | "profile";

export interface Bilingual {
  en: string;
  am: string;
}

export interface Lesson {
  id: string;
  title: Bilingual;
  body: Bilingual;
  arabic?: string;
}

export interface Course {
  id: string;
  icon: string;
  title: Bilingual;
  desc: Bilingual;
  lessons: Lesson[];
}

export interface Surah {
  id: string;
  name: Bilingual;
  arabicName: string;
  ayah: string;
  translit: string;
  en: string;
  am: string;
  tafsir: Bilingual;
  reference: string;
}

export interface Hadith {
  id: string;
  arabic: string;
  en: string;
  am: string;
  narrator: Bilingual;
  source: string;
}

export interface Dua {
  id: string;
  category: Bilingual;
  title: Bilingual;
  arabic: string;
  translit: string;
  en: string;
  am: string;
  target: number;
}

export interface QuizQuestion {
  id: string;
  q: Bilingual;
  options: Bilingual[];
  answer: number;
  explain: Bilingual;
}

export interface Quiz {
  id: string;
  courseId: string;
  title: Bilingual;
  questions: QuizQuestion[];
}

export interface SeerahEvent {
  id: string;
  year: string;
  title: Bilingual;
  body: Bilingual;
}

export interface Reply {
  id: string;
  author: string;
  body: string;
  time: string;
}

export interface Post {
  id: string;
  author: string;
  initials: string;
  color: string;
  category: string;
  title: string;
  body: string;
  time: string;
  likes: number;
  liked?: boolean;
  reported?: boolean;
  replies: Reply[];
}

export interface QuizRecord {
  quizId: string;
  score: number;
  total: number;
  date: string;
}

export interface BookmarkItem {
  id: string;
  type: "ayah" | "hadith" | "dua" | "lesson" | "seerah";
  title: string;
  snippet?: string;
  reference?: string;
  timestamp?: number;
}

export interface AppContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  tab: Tab;
  setTab: (t: Tab) => void;
  t: Record<string, string>;
  bi: (b: Bilingual) => string;
  completed: string[];
  toggleLesson: (id: string) => void;
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
  quizHistory: QuizRecord[];
  saveQuiz: (r: QuizRecord) => void;
  posts: Post[];
  addPost: (p: Post) => void;
  addReply: (postId: string, body: string) => void;
  likePost: (id: string) => void;
  reportPost: (id: string) => void;
  openSearch: () => void;
  streak: number;
}

export const AppContext = createContext<AppContextValue | null>(null);

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppContext");
  return ctx;
}