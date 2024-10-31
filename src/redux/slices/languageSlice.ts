import { createSlice } from "@reduxjs/toolkit";
import { selectLanguage } from "../../helpers/languageSelector";

const initialState = {
  lang: localStorage.getItem("lang") || "ar",
};
export const languageSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    toggleLang: (state) => {
      if (localStorage.getItem("lang") === "en") {
        localStorage.setItem("lang", "ar");
        state.lang = "ar";
      } else {
        localStorage.setItem("lang", "en");
        state.lang = "en";
      }
      selectLanguage(state.lang as string);
    },
  },
});

export const { toggleLang } = languageSlice.actions;

export default languageSlice.reducer;
