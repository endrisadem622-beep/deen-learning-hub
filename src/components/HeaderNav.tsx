import React from "react";
import {
  BookOpen,
  House,
  GraduationCap,
  HandsPraying,
  ChatCircleDots,
  BookmarkSimple,
  Moon,
  Sun,
  MagnifyingGlass,
  Fire,
  SlidersHorizontal,
} from "@phosphor-icons/react";
import { NavTab, ThemeMode, Language } from "../types";
import { DICTIONARY } from "../data/islamicData";

interface HeaderNavProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  streak: number;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  bookmarksCount: number;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeTab,
  setActiveTab,
  lang,
  setLang,
  theme,
  setTheme,
  streak,
  searchQuery,
  setSearchQuery,
  bookmarksCount,
}) => {
  const d = DICTIONARY[lang];

  const navItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: "home", label: d.navHome, icon: <House size={18} weight="bold" /> },
    { id: "courses", label: d.navLearn, icon: <GraduationCap size={18} weight="bold" /> },
    { id: "quran", label: d.navQuran, icon: <BookOpen size={18} weight="bold" /> },
    { id: "dhikr", label: d.navDua, icon: <HandsPraying size={18} weight="bold" /> },
    { id: "community", label: d.navCommunity, icon: <ChatCircleDots size={18} weight="bold" /> },
    { id: "profile", label: d.navProfile, icon: <BookmarkSimple size={18} weight="bold" /> },
  ];

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/90 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo & Platform Name */}
          <div
            onClick={() => setActiveTab("home")}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-amber-500 flex items-center justify-center shadow-md shadow-emerald-950/20 text-white font-arabic font-bold text-xl transition-transform group-hover:scale-105">
              ن
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-lg tracking-wide text-foreground group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  {d.appTitle}
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  {lang === "am" ? "ኑር" : "Noor"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground hidden sm:block leading-none mt-0.5 font-sans">
                {d.appSubtitle}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 relative ${
                    isActive
                      ? "bg-emerald-800/10 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-300 font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.id === "profile" && bookmarksCount > 0 && (
                    <span className="ml-1 w-4 h-4 text-[10px] font-bold rounded-full bg-amber-500 text-white flex items-center justify-center">
                      {bookmarksCount}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-emerald-600 dark:bg-emerald-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Search, Streak, Lang, Theme */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search Input */}
            <div className="relative hidden lg:block w-48 xl:w-56">
              <MagnifyingGlass
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={d.searchPlaceholder}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-full border border-border bg-muted/40 focus:bg-background focus:outline-none focus:ring-2 focus:ring-emerald-600/40 transition-all placeholder:text-muted-foreground/70"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
                >
                  ×
                </button>
              )}
            </div>

            {/* Daily Streak Indicator */}
            <div
              title={`${streak} ${d.streakDays}`}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-600 dark:text-amber-400 text-xs font-semibold select-none shadow-xs"
            >
              <Fire size={15} weight="fill" className="text-amber-500 animate-pulse" />
              <span>{streak}</span>
              <span className="hidden sm:inline text-[11px] font-normal text-muted-foreground">
                {lang === "am" ? "ቀናት" : "days"}
              </span>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center border border-border rounded-lg p-0.5 bg-muted/30">
              <button
                onClick={() => setLang("en")}
                className={`px-2 py-0.5 text-xs font-medium rounded transition-colors ${
                  lang === "en"
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("am")}
                className={`px-2 py-0.5 text-xs font-medium rounded transition-colors ${
                  lang === "am"
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                አማ
              </button>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={cycleTheme}
              aria-label="Toggle theme mode"
              className="p-2 rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              title={`Mode: ${theme}`}
            >
              {theme === "dark" ? (
                <Moon size={18} weight="fill" className="text-amber-400" />
              ) : theme === "light" ? (
                <Sun size={18} weight="bold" className="text-amber-600" />
              ) : (
                <SlidersHorizontal size={18} weight="bold" className="text-emerald-600" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-border/80 bg-background/95 backdrop-blur-md px-2 py-1.5 shadow-lg">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg text-xs transition-colors relative ${
                  isActive
                    ? "text-emerald-700 dark:text-emerald-400 font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className={`p-1 rounded-md ${isActive ? "bg-emerald-600/10" : ""}`}>
                  {item.icon}
                </div>
                <span className="text-[10px] tracking-tight">{item.label}</span>
                {item.id === "profile" && bookmarksCount > 0 && (
                  <span className="absolute top-0.5 right-1 w-3.5 h-3.5 text-[9px] font-bold rounded-full bg-amber-500 text-white flex items-center justify-center">
                    {bookmarksCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
