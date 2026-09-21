import React, { useState } from "react";
import {
  House,
  BookOpen,
  HandsPraying,
  ChatCircleDots,
  GraduationCap,
  Sun,
  Moon,
  MagnifyingGlass,
  X,
  Sparkle,
  BookmarkSimple,
} from "@phosphor-icons/react";
import { DICTIONARY } from "../data/islamicData";
import { Tab, Lang } from "../types";

interface NavbarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  lang: Lang;
  setLang: (lang: Lang) => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  bookmarkCount: number;
  streakCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  lang,
  setLang,
  theme,
  setTheme,
  searchQuery,
  setSearchQuery,
  bookmarkCount,
  streakCount,
}) => {
  const [showSearch, setShowSearch] = useState(false);
  const t = DICTIONARY[lang];

  const navItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "home", label: t.navHome, icon: <House size={18} weight={activeTab === "home" ? "fill" : "regular"} /> },
    { id: "learn", label: t.navLearn, icon: <GraduationCap size={18} weight={activeTab === "learn" ? "fill" : "regular"} /> },
    { id: "quran", label: t.navQuran, icon: <BookOpen size={18} weight={activeTab === "quran" ? "fill" : "regular"} /> },
    { id: "dua", label: t.navDua, icon: <HandsPraying size={18} weight={activeTab === "dua" ? "fill" : "regular"} /> },
    { id: "community", label: t.navCommunity, icon: <ChatCircleDots size={18} weight={activeTab === "community" ? "fill" : "regular"} /> },
    { id: "profile", label: t.navProfile, icon: <BookmarkSimple size={18} weight={activeTab === "profile" ? "fill" : "regular"} /> },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-card/85 border-b border-border transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo & Brand */}
            <button
              onClick={() => setActiveTab("home")}
              className="flex items-center gap-3 text-left focus:outline-none group transition-transform active:scale-95"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-800 via-emerald-700 to-amber-500 flex items-center justify-center text-white shadow-md shadow-emerald-950/20 ring-1 ring-amber-400/30">
                <span className="font-arabic text-xl font-bold">نور</span>
              </div>
              <div className="hidden xs:block">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {t.appTitle}
                  </span>
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                    BETA
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">{t.appSubtitle}</p>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {item.id === "profile" && bookmarkCount > 0 && (
                      <span className="ml-1 text-[11px] font-bold px-1.5 py-0.2 rounded-full bg-accent text-accent-foreground">
                        {bookmarkCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Actions: Search, Lang, Theme */}
            <div className="flex items-center gap-2">
              {/* Search Toggle */}
              <div className="relative">
                {showSearch ? (
                  <div className="flex items-center bg-muted/80 rounded-lg px-2.5 py-1.5 border border-border w-48 sm:w-64 transition-all">
                    <MagnifyingGlass size={16} className="text-muted-foreground mr-2 shrink-0" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t.searchPlaceholder}
                      className="bg-transparent border-none outline-none text-xs w-full text-foreground placeholder:text-muted-foreground"
                      autoFocus
                    />
                    <button
                      onClick={() => {
                        setShowSearch(false);
                        setSearchQuery("");
                      }}
                      className="text-muted-foreground hover:text-foreground ml-1"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowSearch(true)}
                    aria-label="Search"
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <MagnifyingGlass size={19} />
                  </button>
                )}
              </div>

              {/* Streak Badge */}
              <div
                title={`${streakCount} Day Streak`}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-semibold"
              >
                <Sparkle size={14} weight="fill" className="text-amber-500 animate-pulse" />
                <span>{streakCount} {t.streakDays}</span>
              </div>

              {/* Language Switcher */}
              <div className="flex items-center bg-muted/60 p-0.5 rounded-lg border border-border text-xs">
                <button
                  onClick={() => setLang("en")}
                  className={`px-2 py-1 rounded font-medium transition-all ${
                    lang === "en" ? "bg-card text-foreground shadow-xs font-semibold" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang("am")}
                  className={`px-2 py-1 rounded font-medium transition-all ${
                    lang === "am" ? "bg-card text-foreground shadow-xs font-semibold" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  አማ
                </button>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                aria-label="Toggle Theme"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                {theme === "light" ? <Moon size={19} /> : <Sun size={19} className="text-amber-400" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-lg border-t border-border px-2 py-1.5 transition-colors duration-200">
        <div className="grid grid-cols-6 gap-1 items-center">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex flex-col items-center justify-center py-1.5 px-1 rounded-lg transition-all ${
                  isActive
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className={`p-1 rounded-md transition-colors ${isActive ? "bg-primary/10" : ""}`}>
                  {item.icon}
                </div>
                <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[50px]">
                  {item.label}
                </span>
                {item.id === "profile" && bookmarkCount > 0 && (
                  <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-accent" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};