import { toggleLang } from "../slices/languageSlice";
import { store } from "../store";

const dispatch = store.dispatch;

export const onToggleLang = () => {
  dispatch(toggleLang());
};
