import { create } from "zustand";
import { theme } from "../theme/theme";

export const useThemeStore=create((set)=>({
    themes:localStorage.getItem("chat-theme")||"light",
    setThemes:(theme)=>{
        localStorage.setItem("chat-theme",theme);
        set({themes:theme});
    },
}));