import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { en, type Copy } from "./en";
import { sk } from "./sk";

export type Lang = "en" | "sk";
const COPIES: Record<Lang, Copy> = { en, sk };
const STORAGE_KEY = "hado-lang";

function initialLang(): Lang {
  if (typeof window === "undefined") return "en";
  const fromUrl = new URLSearchParams(window.location.search).get("lang");
  if (fromUrl === "en" || fromUrl === "sk") return fromUrl;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "sk") return saved;
  } catch {
    // Storage blocked (private mode etc.): fall through to the browser language.
  }
  return navigator.language?.toLowerCase().startsWith("sk") ? "sk" : "en";
}

type LangState = { lang: Lang; setLang: (l: Lang) => void; t: Copy };
const LangContext = createContext<LangState | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // Not persisted; the choice still applies for this visit.
    }
  }, []);

  const t = COPIES[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.meta.description);
  }, [lang, t]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangState {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}
